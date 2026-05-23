from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from .models import Product, Order, Message, StoreSettings, ProductImage, HeroBanner
from .serializers import ProductSerializer, OrderSerializer, MessageSerializer, StoreSettingsSerializer, HeroBannerSerializer, ProductImageSerializer
from django.core.cache import cache
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

def update_best_sellers_if_needed():
    last_update = cache.get('last_bestseller_update')
    now = timezone.now()
    
    # Check if 24 hours have passed (or first time)
    if not last_update or (now - last_update) > timedelta(hours=24):
        # 1. Clear existing Best Seller badges
        Product.objects.filter(badge__iexact='Best Seller').update(badge=None)
        
        # 2. Get top 4 ordered product names
        top_products = Order.objects.values('product').annotate(count=Count('id')).order_by('-count')[:4]
        
        # 3. Apply Best Seller badge
        for item in top_products:
            product_name = item['product']
            if product_name:
                Product.objects.filter(name=product_name).update(badge='Best Seller')
                
        # 4. Update the timestamp in cache
        cache.set('last_bestseller_update', now, timeout=None)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def list(self, request, *args, **kwargs):
        # Trigger the 24-hour background update check
        try:
            update_best_sellers_if_needed()
        except Exception as e:
            print(f"Error updating best sellers: {e}")
        return super().list(request, *args, **kwargs)
        
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        product = serializer.save()
        gallery_images = self.request.FILES.getlist('gallery')
        for img in gallery_images:
            ProductImage.objects.create(product=product, image=img)

    def perform_update(self, serializer):
        product = serializer.save()
        gallery_images = self.request.FILES.getlist('gallery')
        # If new gallery images are provided, we add them
        for img in gallery_images:
            ProductImage.objects.create(product=product, image=img)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_update(self, serializer):
        old_message = self.get_object()
        new_message = serializer.save()
        
        # Check if a new reply was added
        if not old_message.reply and new_message.reply:
            try:
                subject = f"Reply to your inquiry: {new_message.subject}"
                message_text = f"Hello {new_message.name},\n\nThank you for reaching out to Bin Libas.\n\nOur team has replied to your message:\n\n\"{new_message.reply}\"\n\nIf you have any further questions, feel free to reply to this email.\n\nBest regards,\nBin Libas Team"
                
                send_mail(
                    subject,
                    message_text,
                    settings.EMAIL_HOST_USER,
                    [new_message.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Failed to send email: {e}")

class StoreSettingsViewSet(viewsets.ModelViewSet):
    queryset = StoreSettings.objects.all()
    serializer_class = StoreSettingsSerializer
    permission_classes = [AllowAny] # Allow read/write for now, or IsAuthenticated for write
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

from django.contrib.auth.models import User
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(username=data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data.get('name', '')
        )
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    delivered_orders = Order.objects.filter(status='delivered')
    total_revenue = sum(order.amount for order in delivered_orders)
    active_products = Product.objects.filter(active=True).count()
    unread_messages = Message.objects.filter(read=False).count()
    pending_orders = Order.objects.filter(status='processing').count()
    
    return Response({
        'total_revenue': total_revenue,
        'total_orders': Order.objects.count(),
        'active_products': active_products,
        'unread_messages': unread_messages,
        'pending_orders': pending_orders
    })


class ActiveBannerView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            banner = HeroBanner.objects.filter(is_active=True).latest('created_at')
            serializer = HeroBannerSerializer(banner, context={'request': request})
            return Response(serializer.data)
        except HeroBanner.DoesNotExist:
            return Response({}, status=200)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]

class HeroBannerManageViewSet(viewsets.ModelViewSet):
    queryset = HeroBanner.objects.all()
    serializer_class = HeroBannerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

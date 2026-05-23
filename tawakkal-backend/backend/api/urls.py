from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, MessageViewSet, StoreSettingsViewSet, dashboard_stats, register_user, ActiveBannerView, HeroBannerManageViewSet, ProductImageViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'settings', StoreSettingsViewSet)
router.register(r'hero-banner-manage', HeroBannerManageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('hero-banner/', ActiveBannerView.as_view(), name='hero-banner'),
]

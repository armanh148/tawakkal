from rest_framework import serializers
from .models import Product, Order, Message, StoreSettings, ProductImage, HeroBanner

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    gallery = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class StoreSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreSettings
        fields = '__all__'

class HeroBannerSerializer(serializers.ModelSerializer):
    bg_image = serializers.ImageField(use_url=True, required=False)
    left_image = serializers.ImageField(use_url=True, required=False)
    right_image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = HeroBanner
        fields = ['id', 'title', 'subtitle', 'bg_image', 'left_image', 'right_image', 'is_active']

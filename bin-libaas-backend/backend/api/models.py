from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Ready to Wear', 'Ready to Wear'),
        ('Unstitched', 'Unstitched'),
        ('Luxe Edition', 'Luxe Edition'),
        ('Embroidered', 'Embroidered'),
        ('Accessories', 'Accessories'),
        ('Jewelry', 'Jewelry'),
    ]
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Ready to Wear')
    price = models.CharField(max_length=50)
    image = models.ImageField(upload_to='products/', null=True, blank=True, max_length=500)
    badge = models.CharField(max_length=50, blank=True, null=True)
    stock = models.IntegerField(default=0)
    sizes = models.JSONField(default=list, blank=True)
    colors = models.JSONField(default=list, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/gallery/', max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.name}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    order_id = models.CharField(max_length=20, unique=True)
    customer = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    product = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    address = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order_id} - {self.customer}"


class Message(models.Model):
    SUBJECT_CHOICES = [
        ('order', 'Order Inquiry'),
        ('return', 'Return/Exchange'),
        ('product', 'Product Question'),
        ('feedback', 'Feedback'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES, default='other')
    message = models.TextField()
    reply = models.TextField(blank=True, null=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"


class StoreSettings(models.Model):
    store_name = models.CharField(max_length=100, default='Binlibaas')
    email = models.EmailField(default='admin@binlibaas.com')
    phone = models.CharField(max_length=20, default='0300-7904231')
    whatsapp = models.CharField(max_length=20, default='03230000883')
    currency = models.CharField(max_length=10, default='PKR')
    address = models.TextField(default='Opposite GC University, Kotwali Road, Faisalabad')

    class Meta:
        verbose_name = 'Store Settings'

    def __str__(self):
        return self.store_name


class HeroBanner(models.Model):
    title = models.CharField(max_length=200, blank=True)
    subtitle = models.CharField(max_length=200, blank=True)
    bg_image = models.ImageField(upload_to='banners/')
    left_image = models.ImageField(upload_to='banners/', blank=True)
    right_image = models.ImageField(upload_to='banners/', blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Hero Banner'
        ordering = ['-created_at']

    def __str__(self):
        return self.title or f"Banner #{self.pk}"

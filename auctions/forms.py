from django import forms
from .models import Category, Auction


class AuctionForm(forms.ModelForm):
    class Meta:
        model = Auction
        fields = ('title', 'description', 'starting_bid', 'category', 'image')
        widgets = { 'category' : forms.Select(choices=Category.objects.all(), attrs={'class' : 'form-control'}),
                    'title': forms.TextInput(attrs={'class': 'form-control mt-2'}),
                    'description': forms.TextInput(attrs={'class': 'form-control mt-2'}),
                    'starting_bid': forms.NumberInput(attrs={'class': 'form-control mt-2'}),
                    'image': forms.FileInput(attrs={'class': 'mt-2'}),
                } 
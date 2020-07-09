from django.shortcuts import render
from django.http import HttpResponse
import json

from .models import Book,BookSerializer
# Create your views here.
def indexform(request):
    return render(request,'index.html')

def save_book(request):
    name = request.GET['name']
    pages = request.GET['pages']
    prize = request.GET['prize']
    # print(name,pages,prize)
    book = Book(name=name,prize=prize,pages=pages)
    try:
        book.save()
        return HttpResponse('true')
    except:
        return HttpResponse('false')

def show_book(request):
    books = Book.objects.all()
    l = list()
    for bk in books:
        ser = BookSerializer(bk)
        data = ser.data
        l.append(data)
    array_in_list= json.dumps(l)
    # print(array_in_list)


    return HttpResponse(array_in_list)

def delete_book(request):
    try:
        id = request.GET['id']
        book = Book.objects.get(id=id)
        print(id)
        book.delete()
        return HttpResponse('true')
    except:
        return HttpResponse('false')

def update_book(request):
    id = request.GET['id']
    print(id)
    book = Book.objects.get(id=id)
    print(book.name)
    print(book.prize)
    print(book.pages)


    return HttpResponse('true')
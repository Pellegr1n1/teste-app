<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nmproduct',
        'qtproduct',
        'price',
        'image',
        'fgenabled',
        'iduser',
        'idcategory'
    ];

    // Relacionamento

    public function category()
    {
        return $this->belongsTo(Category::class, 'idcategory');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'iduser');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'iduser');
    }
}

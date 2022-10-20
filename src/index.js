function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then(function(data){
        data.unshift("All");
        for(var item of data){
            var option=document.createElement("option");
            option.text=item.toUpperCase();
            option.value=item;
            document.getElementById("category").appendChild(option)                   
        }
    })
}
function LoadProducts(url){
    document.getElementById("catalog").innerHTML="";
    fetch(url)
    .then(res=>res.json())
    .then(function(data){
        for(var item of data){
            var div=document.createElement("div");
            div.className="card p-3 m-2";
            div.style.width="200px";
            div.innerHTML=`
                <img src=${item.image} height="140" class="card-img-top">
                <div class="card-header" style="height:200px;">
                    <p class="title">${item.title}</p>
                </div>
                <div class="card-body">
                    <dl>
                        <dt>Price</dt>    
                        <dd>${item.price}</dd>
                        <dt>Rating</dt>
                        <dd>
                            <span class="bi bi-star-half text-success"></span>    
                            ${item.rating.rate}[${item.rating.count}]
                        </dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger w-100" onclick="AddtoCartClick(${item.id})">
                    <span class="bi bi-cart3"></span> Add To Cart
                    </button>
                </div>
            `;
            document.getElementById("catalog").appendChild(div);
        }
    })
}
var cartItem=[];
function LoadCartCount(){
    document.getElementById("cartCount").innerHTML=cartItem.length;
}
function AddtoCartClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(function(data){
        cartItem.push(data);
        LoadCartCount();
        alert(`${data.title}\n Added to Cart`)
    })
}

function showItemClick(){
    document.querySelector("tbody").innerHTML="";
    for(var item of cartItem){
        var tr=document.createElement("tr");
        var tdtitle=document.createElement("td");
        var tdPrice=document.createElement("td");
        var tdPreview=document.createElement("td");

        tdtitle.innerHTML=item.title;
        tdPrice.innerHTML=item.price;

        var img=document.createElement("img");
        img.src=item.image;
        img.width="50";
        img.height="50";

        tdPreview.appendChild(img);

        tr.appendChild(tdtitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPreview)

        document.querySelector("tbody").appendChild(tr)
    }
}

function bodyload(){
    LoadProducts("https://fakestoreapi.com/products");
    LoadCategories();
}
function CategoryChange(){
    var categoryname=document.getElementById("category").value;
    if(categoryname=="All"){
        LoadProducts("https://fakestoreapi.com/products")
    }else{
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryname}`)
    }
}


///.................filter product item............


var filterinput=document.getElementById("search");

filterinput.addEventListener('keyup',filterProducts)

function filterProducts(){
    var filterValue=filterinput.value.toUpperCase();
    // console.log(filterValue);
    var item=document.querySelectorAll(".card")


    for(var i=0; i<item.length; i++){
        let span=item[i].querySelector(".title")
        if(span.innerHTML.toUpperCase().indexOf(filterValue)>-1){
            item[i].style.display="initial";
        }else{
            item[i].style.display="none";
        }
    }
}



var express = require('express');
var cookieParser = require('cookie-parser');
var app =express();
var bodyParser = require('body-parser');
var items = require('./items.json');
app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({  
  extended: true
}));
app.use(cookieParser());
var path = require('path');
app.post('/app/add_to_cart',function(req,res){
	console.log('add');
	var cart = req.cookies.cart;
	if(cart===undefined)
	cart=[];
	else
	cart=JSON.parse(cart);
	var item_name=req.body.name;
	var item_id=parseInt(req.body.id);
	var item_quantity=parseInt(req.body.quantity);
	var item_price=parseInt(req.body.price);
	var f =true;
	for(var i in cart)
	{
			if(cart[i].hasOwnProperty(item_id))
			{
				cart[i][item_id].quantity+=item_quantity;
				res.cookie('cart',JSON.stringify(cart));
				f=false;
				console.log(JSON.stringify(cart));
			}
	}
	if(f)
	{
		var item_prop={};
		var item={};
		item_prop['price']=item_price;
		item_prop['quantity']=item_quantity;
		item_prop['item_name']=item_name;
		item[item_id]=item_prop;
		cart.push(item);
		res.cookie('cart',JSON.stringify(cart));
		console.log(JSON.stringify(cart));
	}
	res.redirect('/');
	res.end();
});
app.post('/app/remove_from_cart',function(req,res){
	console.log('remove');
	var cart = req.cookies.cart;
	if(cart===undefined)
	cart=[];
	else
	cart=JSON.parse(cart);
	var item_id=parseInt(req.body.id);
	for(var i in cart)
	{
			if(cart[i].hasOwnProperty(item_id))
			{
				cart.splice(i,1);
				res.cookie('cart',JSON.stringify(cart));
				console.log(JSON.stringify(cart));
			}
			
	}
	res.redirect('/');
	res.end();
});
app.post('/app/update_cart',function(req,res){
	console.log('update');
	var cart = req.cookies.cart;
	if(cart===undefined)
	cart=[];
	else
	cart=JSON.parse(cart);
	var item_name=req.body.name;
	var item_id=parseInt(req.body.id);
	var item_quantity=parseInt(req.body.quantity);
	var item_price=parseInt(req.body.price);
	var f =true;
	for(var i in cart)
	{
			if(cart[i].hasOwnProperty(item_id))
			{
				cart[i][item_id].quantity=item_quantity;
				cart[i][item_id].price=item_price;
				res.cookie('cart',JSON.stringify(cart));
				f=false;
				console.log(JSON.stringify(cart));
			}
	}
	if(f)
	{
		var item_prop={};
		var item={};
		item_prop['price']=item_price;
		item_prop['quantity']=item_quantity;
		item_prop['item_name']=item_name;
		item[item_id]=item_prop;
		cart.push(item);
		res.cookie('cart',JSON.stringify(cart));
		console.log(JSON.stringify(cart));
	}
	res.redirect('/');
	res.end();
});
app.post('/app/fill_cart',function(req,res){
	console.log('Rendering cart...');
	var cart = req.cookies.cart;
	if(cart===undefined)
	{
		res.setHeader('Content-Type', 'application/json');
		res.end(html);
		console.log("Nothing to Render");
	}
	else
	{
		cart=JSON.parse(cart);
		var html="";
		//console.log(cart);
		for(var i in cart)
		{
				var data = cart[i];
				for(var x in data)
	    		{
					var id = parseInt(x);
				    var price = parseInt(data[x].price);
				    var quantity = parseInt(data[x].quantity);
				    var name = data[x].item_name;
				    html+='<div class="text-success row">      <form id="cart_list_ele" class="item" action="" method="post">        <span id="item_name">'+name+'</span>        <input type="hidden" name="name" value="'+name+'" ></input>        <span id="item_price" style="margin-left:120px">Rs '+price+'</span>       <input type="hidden"  name="price" value="'+price+'" ></input>        <input type="number" min="1" max="10" name="quantity" style="margin-left:40px" value="'+quantity+'"></input>      <input type="hidden" name="id" value="'+id+'"></input>&nbsp&nbsp&nbsp<input type="submit" value="Remove" class="btn btn-primary" onclick="target_form_remove()" id="remove"></input>&nbsp&nbsp&nbsp<input type="submit" value="Update" class="btn btn-primary" onclick="target_form_update()" id="Update"></input>      </form>    </div>  ';
				}
		}
		res.setHeader('Content-Type', 'application/json');
		res.json(html);
		console.log("Rendered.. and sent");
	}
});
app.get('/app/fetch_items',function(req,res){
	console.log('Rendering items...');
	var html='';
	for(var y in items)
	{
		//console.log(items);
		var data = items[y];
		for(var x in data)
		{
			var id = parseInt(x);
		 	var price = parseInt(data[x].price);
			var quantity = parseInt(data[x].quantity);
			var name = data[x].item_name;
			html+='<div class="text-success row">      <form id="item_list_ele" class="item" action="app/add_to_cart" method="post">       <span id="item_name">'+name+'</span>        <input type="hidden" name="name" value="'+name+'" ></input>        <span id="item_price" style="margin-left:40px">Rs '+price+'</span>        <input type="hidden"  name="price" value="'+price+'" ></input>        <input type="number" min="1" max="10" name="quantity" value="1" style="margin-left:30px"></input>      <input type="hidden" name="id" value="'+id+'"></input>      <input type="submit" value="Add to Cart" class="btn btn-primary" id="add"></input>      </form>    </div>';
				}
	}
	res.json(html);
	console.log("Rendered.. and sent");
});
app.use(express.static(__dirname +'/js'));
app.use(express.static(__dirname +'/css'));
app.use('/',function(req,res){
	res.sendFile(__dirname +'/index.html');
});
app.listen(8181);
/*


	
	
	*/
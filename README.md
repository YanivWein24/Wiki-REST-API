# Wiki-REST-API
<br>

## Requirements:
* Node.js & Express
* MongoDB
* Postman (to send HTTP requests)
* Download the code or clone it to your local repository.
* `npm install` all dependencies from `package.json`.
* Run `app.js` on a local node server (default PORT number: 3000).  

## Changing PORT number:
On the bottom of `app.js` there's a `Listen` function that use the default port - 3000.  
To change the port number, you need to change the arg inside the function from "3000" to your preferred port.
``` javascript
app.listen(3000, function () {
```  
<br>  

## Sending HTTP requests via Postman:
* **If you wish to  target ALL the objects, use this URL:**  
  - localhost:PortNumber/articles/  
  - Example: &nbsp; localhost:3000/articles/

* **If you wish to  target a specific object, use this URL:**  
  - localhost:PortNumber/articles/ArticleTitle  
  - Example: &nbsp; localhost:3000/articles/API  

If you wish to add `Key:Value` pairs for your request (for example, for a `put` request), tap on  
the "Body" section inside your request in postman, and select "x-www-form-urlencoded" encoding.  
Here you can add as many `Key:Value` pairs as you like.  
<br>  

## Screenshots:
Get all articles:  
<img src="https://user-images.githubusercontent.com/97472180/168808126-b79a5c08-4a6e-485e-b460-1b346b808f5b.png" alt="GET-ALL"/>  

Post new article:  
<img src="https://user-images.githubusercontent.com/97472180/168808114-75295034-e554-4fbd-8026-c237a1f1d00c.png" alt="POST"/>  

Put (update) an article:  
<img src="https://user-images.githubusercontent.com/97472180/168808121-206fd675-6586-4ea2-8785-d75891f139c2.png" alt="PUT"/>  

Delete an article:  
<img src="https://user-images.githubusercontent.com/97472180/168808123-c8a31b5d-7bc4-4e6d-8862-1693346888e2.png" alt="DELETE"/>  

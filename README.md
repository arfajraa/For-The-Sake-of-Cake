# For-The-Sake-of-Cake

# Technologies Used:
- Node Express
- Postgres
- AJAX
- Javascript
- jQuery
- HTML
- CSS

# Wireframes:
- https://xd.adobe.com/view/592f45d0-b3f2-470f-7b8c-fa0da1275834-2f1e/

# User Stories:
- As a user, I want to create an account so I can sign in to make orders.
- As a user, I want to browse through products and add items to my cart.
- As a user, I want to check-out with the items in my cart and make a payment to complete my order.
- As a user, I want to have access to my previous orders to check their status.
- As a user, I want to be able to look at the items in each previous order to see more details.

# Approach taken:
- Divide and conquer for models, controllers and views. Focusing on getting each thing to work at a time to make sure I end up with a robust web application.
- Cart system created and managed with front end scripts and utilizing session storage to be able to add items to cart without making the user have to log in. They only have to log in when they try to check out and complete the order.
- Database relationships between the users and orders (1 user can have many orders), and between the order and orderItems (1 order can have many order items), and 1 orderItem can have 1 product with a specified quantity.

# Installation instructions:
- None. Just launch the provided Heroku link.

# Unsolved problems:
- The user can clear their cart but can't remove/edit the quantity of a single item in the cart.
- The payment is not live because the project is not in production level yet.

# Resources:
- https://www.postgresql.org/docs/
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://www.w3schools.com/
- http://getskeleton.com/

# Shoutouts:
- Trevor
- Jackie
- Ghadeer
- Sultan
Special thanks for the support you provided throughout the project.
# camagru
This web project to create a small web application allowing you to
make basic photo and video editing using your webcam and some predefined images.


Users can select an image in a list of superposable images, take a picture with his/her webcam and admire the result that should be mixing
both pictures.

All captured images is public, likeables and commentable.

# Code

For client used clear javascript
For back-end php
All requests for post-production on AJAX

# User features

![Alt text] (https://media.giphy.com/media/uBnTCTVrv3eWoDhtpZ/giphy.gif)

• The application allow a user to sign up by asking at least a valid email
address, an username and a password with at least a minimum level of complexity.
• At the end of the registration process, an user should confirm his account via a
unique link sent at the email address fullfiled in the registration form.
• The user can to connect to application, using his username
and his password. He also can tell the application to send a password
reinitialisation mail, if he forget his password.
• The can be able to disconnect in one click at any time on any page.
• Once connected, an user can modify his username, mail address or password.

# Gallery features

• This part is to be public and display all the images edited by all the users,
ordered by date of creation. It also only a connected user to like
them and/or comment them.
• When an image receives a new comment, the author of the image is be notified
by email. This preference must can be set as true by default but can be deactivated in
user’s preferences.
• The list of images must be paginated, with at least 5 elements per page.

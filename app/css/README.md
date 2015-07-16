git CSS Conventions and style guide
-------------------------------

Naming conventions:
- Use classes for everything
- Prefix all class names with "zen_"
- Use dashes for spaces, eg "zen_menu-bar"
- Each 'page' of the site gets its own .scss file, eg user.scss
- Use _vars to store universal things that we will want to tweak, eg colors, sizes, etc.
- Compile everything into main.css until it becomes unwieldy
- webkit is probably the only vendor prefix we need to support

Styling guidelines:
- Mobile first: everything should work at 320px, then add progressively enhancing media queries at 480, 640, 720, 960 etc. as needed
- Browser support: IE9+, and the current and previous 2 versions of Chrome, FF, Safari, Opera, iOS Safari, Android Chrome, and mobile FF
- Try to avoid using pixel sizes; ems instead

Upload yout .txt file with commands for drawing and get new .txt file with the canvas.

Example:

C w h L x1 y1 x2 y2  
R x1 y1 x2 y2  
B x y c 
L x1 y1 x2 y2 

Create Canvas (C): Should create a new canvas of width w and height h.  

Create Line (L): Should create a new line from (x1,y1) to (x2,y2). Currently only horizontal or
vertical lines are supported. Horizontal and vertical lines will be drawn using the 'x'
character.  

Create Rectangle (R): Should create a new rectangle, whose upper left corner is (x1,y1) and
lower right corner is (x2,y2). Horizontal and vertical lines will be drawn using the 'x'
character.  

Bucket Fill (B): Should fill the entire area connected to (x,y) with "colour" c. The behavior of this
is the same as that of the "bucket fill" tool in paint programs.

The Bricks 

![image](https://github.com/user-attachments/assets/c72e4f7b-7af6-44d0-a29e-f12d674973c2)

The Google Bricks

This project is a web-based brick-breaking game inspired by classic arcade games like Breakout. Players control a paddle to bounce a ball and destroy a grid of colored bricks. The game features a Google-themed ball and a simple, intuitive interface with start/stop controls.
Features

    4x7 grid of colorful bricks to break
    Paddle controlled by arrow keys
    Custom Google logo ball with fallback option
    Start and Stop buttons for game control
    Win condition with congratulatory alert
    Credentials pop-up with author information

Technologies Used

    HTML
    CSS (external stylesheet linked)
    JavaScript (Canvas API, Event Listeners, and Animation Frames)
    SweetAlert2 for pop-up messages

How to Play

    Click the "Start" button to begin the game.
    Use the left and right arrow keys to move the paddle.
    Bounce the ball with the paddle to break all the bricks.
    If the ball falls below the paddle, the game ends with a "GAME OVER" alert.
    Break all 28 bricks to win and see a "YOU WIN, CONGRATULATIONS!" message.
    Click "Stop" to pause the game at any time.
    Use the "Credentials" button to view author information.

Code Structure

    canvas and ctx: Used for rendering the game elements (ball, paddle, bricks).
    initGame(): Initializes game variables, including ball position, paddle, and brick grid.
    draw(): Main game loop that updates and renders the game state using requestAnimationFrame.
    collisionDetection(): Handles ball-brick collisions and win condition.
    paddleCollision(): Manages ball-paddle interactions with directional bounce.
    drawBall(), drawPaddle(), drawBricks(): Functions to render individual game components.
    SweetAlert2: Displays credentials in a pop-up.

Author

Developed by Luka Dragan
Future Enhancements

    Add multiple difficulty levels with varying ball speeds or brick layouts.
    Implement a scoring system based on bricks broken or time taken.
    Introduce power-ups (e.g., larger paddle, multi-ball) dropping from bricks.
    Add sound effects for collisions, wins, and losses.
    Enable customizable brick patterns or colors via user input.

Enjoy breaking the bricks!

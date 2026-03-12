// Safety check: only run game code if canvas exists
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('Game canvas not found. This script should only be loaded on game.html');
        }
        
        const ctx = canvas ? canvas.getContext('2d') : null;
        const scoreElement = document.getElementById('score');
        const gameOverElement = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');

        // Exit if required elements are missing
        if (!canvas || !ctx || !scoreElement || !gameOverElement || !finalScoreElement) {
            console.error('Game elements missing');
        }

        const TILE_COUNT = 20; // Fixed tiles for consistent gameplay
        let gridSize;
        let snake = [{x: 10, y: 10}];
        let dx = 0;
        let dy = 0;
        let foodX;
        let foodY;
        let score = 0;
        let gameRunning = true;
        let touchStartX = 0;
        let touchStartY = 0;

        // Resize canvas responsively
        function resizeCanvas() {
            const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7, 400);
            canvas.width = size;
            canvas.height = size;
            gridSize = size / TILE_COUNT;
        }

        // Initial resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Place initial food
        function randomFood() {
            foodX = Math.floor(Math.random() * TILE_COUNT);
            foodY = Math.floor(Math.random() * TILE_COUNT);
        }
        randomFood();

        // Keyboard controls
        if (canvas) {
            document.addEventListener('keydown', changeDirection);
        }

        function changeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            const keyPressed = event.keyCode;
            const goingUp = dy === -1;
            const goingDown = dy === 1;
            const goingRight = dx === 1;
            const goingLeft = dx === -1;

            if (keyPressed === LEFT_KEY && !goingRight) {
                dx = -1; dy = 0;
            }
            if (keyPressed === UP_KEY && !goingDown) {
                dx = 0; dy = -1;
            }
            if (keyPressed === RIGHT_KEY && !goingLeft) {
                dx = 1; dy = 0;
            }
            if (keyPressed === DOWN_KEY && !goingUp) {
                dx = 0; dy = 1;
            }
        }

        // Touch/swipe controls for mobile
        if (canvas) {
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: false });

            canvas.addEventListener('touchend', (e) => {
                if (!gameRunning) return;
                e.preventDefault();
                const touchEndX = e.changedTouches[0].screenX;
                const touchEndY = e.changedTouches[0].screenY;
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;

                const goingUp = dy === -1;
                const goingDown = dy === 1;
                const goingRight = dx === 1;
                const goingLeft = dx === -1;

                const SWIPE_THRESHOLD = 40; // Min swipe distance

                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > SWIPE_THRESHOLD && !goingLeft) {
                        dx = 1; dy = 0;
                    } else if (deltaX < -SWIPE_THRESHOLD && !goingRight) {
                        dx = -1; dy = 0;
                    }
                } else {
                    // Vertical swipe
                    if (deltaY > SWIPE_THRESHOLD && !goingUp) {
                        dx = 0; dy = 1;
                    } else if (deltaY < -SWIPE_THRESHOLD && !goingDown) {
                        dx = 0; dy = -1;
                    }
                }
            }, { passive: false });
        }

        function drawGame() {
            // Clear canvas with dark background
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (!gameRunning) return;

            // Move snake
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);

            // Check food collision
            if (head.x === foodX && head.y === foodY) {
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                randomFood();
            } else {
                snake.pop();
            }

            // Check wall collision
            if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
                gameOver();
                return;
            }

            // Check self collision
            for (let segment of snake.slice(1)) {
                if (head.x === segment.x && head.y === segment.y) {
                    gameOver();
                    return;
                }
            }

            // Draw glowing snake (light blue glow effect)
            ctx.shadowColor = '#00BFFF';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#87CEEB'; // Light blue body
            ctx.strokeStyle = '#00BFFF'; // Glowing edge
            ctx.lineWidth = 2;
            for (let i = 0; i < snake.length; i++) {
                const segment = snake[i];
                const alpha = 1 - (i / snake.length) * 0.3; // Fade tail slightly
                ctx.globalAlpha = alpha;
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
                ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0; // Reset glow

            // Draw book food (📚 icon with glow)
            ctx.shadowColor = '#FF69B4';
            ctx.shadowBlur = 10;
            ctx.font = `bold ${Math.floor(gridSize * 0.9)}px Arial`;
            ctx.fillStyle = '#FF1493'; // Hot pink for visibility
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('📚', foodX * gridSize + gridSize / 2, foodY * gridSize + gridSize / 2);
            ctx.shadowBlur = 0;

            setTimeout(drawGame, 150); // Game speed (adjustable)
        }

        function gameOver() {
            gameRunning = false;
            finalScoreElement.textContent = score;
            gameOverElement.style.display = 'block';
        }

        function restartGame() {
            snake = [{x: 10, y: 10}];
            dx = 0;
            dy = 0;
            score = 0;
            scoreElement.textContent = `Score: ${score}`;
            randomFood();
            gameRunning = true;
            gameOverElement.style.display = 'none';
            drawGame();
        }

        // Start the game only if canvas exists
        if (canvas && ctx && gameRunning !== undefined) {
            drawGame();
        }
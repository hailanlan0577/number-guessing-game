document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const guessInput = document.getElementById('guess');
    const checkButton = document.getElementById('check');
    const messageElement = document.getElementById('message');
    const historyList = document.getElementById('history-list');
    const attemptsElement = document.getElementById('attempts');
    const restartButton = document.getElementById('restart');
    
    let targetNumber; // 要猜的目标数字
    let attempts; // 尝试次数
    let gameOver; // 游戏是否结束
    
    // 初始化游戏
    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1; // 1-100的随机数
        attempts = 0;
        gameOver = false;
        
        // 重置UI
        guessInput.disabled = false;
        checkButton.disabled = false;
        messageElement.textContent = '等待你的第一次猜测...';
        messageElement.className = '';
        historyList.innerHTML = '';
        attemptsElement.textContent = '0';
        restartButton.classList.add('hidden');
        guessInput.value = '';
        guessInput.focus();
        
        console.log('游戏已初始化，目标数字是:', targetNumber); // 用于测试
    }
    
    // 检查猜测
    function checkGuess() {
        if (gameOver) return;
        
        const userGuess = parseInt(guessInput.value);
        
        // 验证输入
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            alert('请输入1到100之间的有效数字！');
            guessInput.value = '';
            guessInput.focus();
            return;
        }
        
        // 增加尝试次数
        attempts++;
        attemptsElement.textContent = attempts;
        
        // 添加到历史记录
        const listItem = document.createElement('li');
        
        // 比较猜测与目标数字
        let resultText, resultClass;
        
        if (userGuess === targetNumber) {
            resultText = `恭喜！${userGuess} 就是正确答案！`;
            resultClass = 'correct';
            gameOver = true;
            guessInput.disabled = true;
            checkButton.disabled = true;
            restartButton.classList.remove('hidden');
            listItem.textContent = `第 ${attempts} 次: ${userGuess} (正确！)`;
        } else if (userGuess > targetNumber) {
            resultText = `${userGuess} 太大了！再试一次。`;
            resultClass = 'too-high';
            listItem.textContent = `第 ${attempts} 次: ${userGuess} (太大了)`;
        } else {
            resultText = `${userGuess} 太小了！再试一次。`;
            resultClass = 'too-low';
            listItem.textContent = `第 ${attempts} 次: ${userGuess} (太小了)`;
        }
        
        messageElement.textContent = resultText;
        messageElement.className = resultClass;
        
        historyList.prepend(listItem);
        
        // 清空输入并聚焦
        guessInput.value = '';
        guessInput.focus();
    }
    
    // 事件监听器
    checkButton.addEventListener('click', checkGuess);
    
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    restartButton.addEventListener('click', initGame);
    
    // 初始化游戏
    initGame();
});
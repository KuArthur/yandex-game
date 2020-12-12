const fs = require('fs'); // для работы с файлами
const readline = require('readline'); //для ввода данных в консоли

const arrFromFile = getDataFromFile(); //массив, прочитанный из файла
const arrRand = getRandomArray(); // рандомно сгенерированный массив

// рандомное число
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// рандомный массив
function getRandomArray() {
  const arr = [];
  
  const M = getRandomNumber(10);
  const N = getRandomNumber(10);

  for(let i = 0; i < M; i++) {
    arr[i] = [];

    for(let j = 0; j < N; j++) {
        arr[i][j] = getRandomNumber(2);
    }
  }
  return arr;
}

//подсчет соседей каждого элемента массива
function countNeighbors(arr,i,j) {
    let count = 0;
    for(let a = i - 1; a <= i + 1; a++) {
        for(let b = j - 1; b <= j + 1; b++) {
            if(!(a < 0 || a > arr.length - 1 || b < 0 || b > arr[a].length - 1 || (a === i && b === j))) {
                count += arr[a][b]
            }
        }
    }
    return count;
}

// получение данных из файла
function getDataFromFile() {
  let array = fs.readFileSync('default.txt','utf-8');

  array = array.split("\n");

  for(let i = 0; i < array.length; i++) {
    array[i] = array[i].replace("\r",'').split(' ').map(el => +el);
    
  }
  return array;
}


// создаем игру
function createGame(arr) {
    
    for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let count = countNeighbors(arr,i,j)
            
            if(arr[i][j] === 1) { // если 1
                if(count < 2 || count > 3) { // если меньше двух соседей или больше трех соседей
                    arr[i][j] = 0
                } else if(count === 2 || count === 3) { //если 2 или 3 соседа
                    arr[i][j] = 1;
                }
            } else { // если 0
                if (count === 3) { // если соседей 3
                    arr[i][j] = 1
                }
            }
            
        }
        console.log(arr[i].join(' '));
    }
    console.log('---------------');
    return arr;
}

//задаю ввод и вывод из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// задание условий вывода поля ( рандомное или из файла )
rl.question('Введите 1 для рандомной генерации поля.\nВведите 2 для получения поля из файла.\n ', (answer) => {
  if(answer === '1') {
    answer = setInterval(() => createGame(arrRand) ,1000);
  } else if (answer === '2') {
    answer = setInterval(() => createGame(arrFromFile) ,1000);
  } else answer = 'неверный вариант'

  console.log(answer);

  rl.close();
});
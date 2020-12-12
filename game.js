// const M = 10;
// const N = 10;


// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }
// let arr = [];

// for(let i = 0; i < M; i++) {
//     arr[i] = [];

//     for(let j = 0; j < N; j++) {
//         arr[i][j] = getRandomInt(2);
//     }

//     console.log(arr[i].join(' '));
// }

// console.log(arr);

const arrLarge = [
    [
      1, 1, 0, 1, 0,
      1, 0, 0, 0, 1
    ],
    [
      1, 1, 1, 0, 0,
      1, 1, 1, 0, 1
    ],
    [
      0, 1, 0, 0, 0,
      0, 1, 0, 1, 0
    ],
    [
      1, 0, 1, 1, 0,
      0, 0, 1, 1, 1
    ],
    [
      1, 0, 1, 1, 1,
      0, 0, 1, 1, 0
    ],
    [
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0
    ],
    [
      0, 1, 1, 1, 0,
      1, 0, 1, 1, 1
    ],
    [
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0
    ],
    [
      1, 0, 1, 0, 1,
      0, 0, 0, 1, 0
    ],
    [
      1, 0, 0, 0, 1,
      1, 1, 1, 1, 0
    ]
  ]

const arrSmall = [[ 0, 0, 1, 1 ],[ 1, 1, 1, 1 ],[ 0, 0, 1, 0 ],[ 1, 1, 0, 1 ]];

function countNeighbors(arr,i,j) {
    let count = 0;
    for(let a = i - 1; a <= i + 1; a++) {
        for(let b = j - 1; b <= j + 1; b++) {
            if(!(a < 0 || a > arr.length - 1 || b < 0 || b > arr[a].length - 1 || (a === i && b === j))) {
                // console.log(arr[a][b]);
                count += arr[a][b]
            }
        }
    }

    return count;
}


function game(arr) {
    
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

 let timeid = setInterval(() => game(arrSmall) ,1000);
//  console.log(countNeighbors(arrSmall,0,1));
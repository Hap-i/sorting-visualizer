console.log("Hello world!")
const divArray = []       // contains the all div obj created
const randomWeights = []  //  contains all the random weights(height) given

// ######### create div of different heights #########
function generateNewArray() {
    var mainDiv = document.getElementById('bodyContainer');
    var child = mainDiv.lastElementChild
    while (child) {
        mainDiv.removeChild(child)
        child = mainDiv.lastElementChild
    }

    divArray.splice(0, divArray.length)
    randomWeights.splice(0, randomWeights.length)

    for (let i = 0; i < divCount; i++) {
        var div = document.createElement("DIV");
        div.className = 'arrayElement'
        div.style.backgroundColor = 'blue'
        div.style.width = '40px'
        div.style.border = '2px solid'
        div.style.marginLeft = '3px'
        let weight = Math.floor((Math.random() * 400) + 100);
        div.style.height = weight + 'px'
        div.innerHTML = String(weight)
        div.style.color = 'white'
        randomWeights.push(weight)
        divArray.push(div)
        mainDiv.appendChild(div)
    }
}

// ############# Slider to contorol array size ###############
var slider = document.getElementById("rangeSlider");
var output = document.getElementById("arrayLength");
output.innerHTML = slider.value;
var divCount = 15;
slider.oninput = function () {
    output.innerHTML = this.value;
    divCount = slider.value;
    generateNewArray();
}

// ############ Alogrithm Selection ####################
var currentAlgo = "Nothing"
function selectAlgorithm(algoName) {
    currentAlgo = algoName
    const allAlgos = ['mergeSort', 'selectionSort', 'bubbleSort']
    for (let i = 0; i < allAlgos.length; i++) {
        if (allAlgos[i] != currentAlgo) {
            let currentAlgoButton = document.getElementById(allAlgos[i])
            currentAlgoButton.style.color = 'white'
        }

    }
    let currentAlgoButton = document.getElementById(currentAlgo)
    currentAlgoButton.style.color = 'black'
}


// ################## Bubble Sort #######################
const bubbleSortAllVersions = []
const bubbleSortPairs = []
function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function bubbleSort(arr) {
    n = arr.length
    var i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            bubbleSortPairs.push([j, j + 1])
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
            bubbleSortAllVersions.push(arr.slice())
        }

    }
}
// ##################### END ########################

// ################ Merge Sort #####################
const mergeSortPairs = []
const mergeSortAllVersions = []
function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            mergeSortPairs.push([L[i], R[j]])
            i++;
        }
        else {
            arr[k] = R[j];
            mergeSortPairs.push([R[j], L[i]])
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr, l, r) {
    if (l >= r) {
        return;//returns recursively
    }
    var m = l + parseInt((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

function mergeSortMain(arr) {
    var arr1 = arr.slice()
    var arr_size = arr.length;
    mergeSort(arr, 0, arr_size - 1);
    for (let i = 0; i < mergeSortPairs.length; i++) {
        let a = mergeSortPairs[i][0]
        let b = mergeSortPairs[i][1]
        let index_a = arr1.indexOf(a)
        let index_b = arr1.indexOf(b)

        if (index_b < index_a) {
            arr1.splice(index_a, 1)
            index_b = arr1.indexOf(b)
            arr1.splice(index_b, 0, a)
        }
        mergeSortAllVersions.push(arr1.slice())
    }
}
// ################ END #################

// changes the heights of a div
function changeWeights() {
    for (let i = 0; i < divArray.length; i++) {
        divArray[i].style.height = randomWeights[i] + 'px'
        divArray[i].innerHTML = randomWeights[i]
    }
}

// changes color once the Sorting is finished
function changeColor(color) {
    for (let i = 0; i < divArray.length; i++) {
        divArray[i].style.backgroundColor = color
    }
}


function changeColorOfSwapElement(cName, arr) {
    for (let i = 0; i < arr.length; i++) {
        divArray[arr[i]].style.backgroundColor = cName
    }
}

// used to pause to visualize the effect
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ############# MAIN FUNCTION ###############
async function performSorting() {
    console.log("INSIDE Performsorting")
    if (currentAlgo === 'bubbleSort') {
        console.log("using: ", currentAlgo)
        bubbleSortAllVersions.splice(0, bubbleSortAllVersions.length)
        bubbleSortPairs.splice(0, bubbleSortPairs.length)
        bubbleSort(randomWeights)
        for (let i = 0; i < bubbleSortAllVersions.length; i++) {
            changeColorOfSwapElement('red', bubbleSortPairs[i])
            for (let j = 0; j < randomWeights.length; j++) {
                randomWeights[j] = bubbleSortAllVersions[i][j]
            }
            await sleep(500)
            changeWeights();
            changeColorOfSwapElement('green', bubbleSortPairs[i])
            await sleep(400)
            changeColorOfSwapElement('blue', bubbleSortPairs[i])
            if (i === bubbleSortAllVersions.length - 1) {
                changeColor('green')
            }
        }

    } else if (currentAlgo == 'mergeSort') {
        console.log("using: ", currentAlgo)
        mergeSortAllVersions.splice(0, mergeSortAllVersions.length)
        mergeSortPairs.splice(0, mergeSortPairs.length)
        let arr1 = randomWeights.slice()
        mergeSortMain(arr1)
        for (let i = 0; i < mergeSortAllVersions.length; i++) {
            let index1 = randomWeights.indexOf(mergeSortPairs[i][0])
            let index2 = randomWeights.indexOf(mergeSortPairs[i][1])
            changeColorOfSwapElement('red', [index1, index2])
            for (let j = 0; j < randomWeights.length; j++) {
                randomWeights[j] = mergeSortAllVersions[i][j]
            }
            await sleep(500)
            changeWeights();
            changeColor('blue')
            index1 = randomWeights.indexOf(mergeSortPairs[i][0])
            index2 = randomWeights.indexOf(mergeSortPairs[i][1])
            changeColorOfSwapElement('green', [index1, index2])
            await sleep(400)
            changeColorOfSwapElement('blue', [index1, index2])
            if (i === mergeSortAllVersions.length - 1) {
                changeColor('green')
            }
        }

    } else if (currentAlgo == 'selectionSort') {

        for (let i = 0; i < randomWeights.length; i++) {
            var minEle = 10000
            for (let k = i + 1; k < randomWeights.length; k++) {
                if (minEle > randomWeights[k]) {
                    minEle = randomWeights[k]
                }
            }
            if (randomWeights.indexOf(minEle) > -1) {
                changeColorOfSwapElement('red', [randomWeights.indexOf(minEle)])

            }
            for (let j = i + 1; j < randomWeights.length; j++) {
                if (randomWeights[i] > randomWeights[j]) {
                    let temp = randomWeights[i]
                    randomWeights[i] = randomWeights[j]
                    randomWeights[j] = temp
                }
            }
            await sleep(500)
            changeWeights();
            changeColor('blue')
            if (randomWeights.indexOf(minEle) > -1) {
                changeColorOfSwapElement('green', [randomWeights.indexOf(minEle)])
            }
            await sleep(400)
            if (i === randomWeights.length - 1) {
                changeColor('green')
            }
        }
    }

}


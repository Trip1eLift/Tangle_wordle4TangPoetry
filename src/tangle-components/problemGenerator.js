import data from './five-character-quatrain.json';
//const data = require("./five-character-quatrain.json");

export default class problemGenerator {
    constructor(seed) {
        this.seed = seed;
        const answer = this.manualAnswers(this.seed);
        let wordPool = this.associationWordPooling(answer);
        wordPool = this.shuffleWordPool(wordPool);
        this.answer = answer;
        this.wordPool = wordPool;
    }

    getInit() {
        return [this.answer, this.wordPool];
    }

    getSeed() {
        return this.seed;
    }

    shuffleWordPool(wordPool) {
        let wordPoolArr = [];
        for (let i=0; i<wordPool.length; i++) {
            wordPoolArr.push(wordPool[i]);
        }
        wordPoolArr = this.shuffleArr(wordPoolArr);
        wordPool = "";
        wordPoolArr.forEach((word) => {
            wordPool = wordPool + word;
        });
        return wordPool;
    }

    shuffleArr(array) {
        // copy from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    associationWordPooling(answer) {
        // Assume answer does not have repeat words
        const associativeWord = this.wordScore(answer);
        let wordPool = {};
        let wordList = answer;
        for (let i=0; i<5; i++)
            wordPool[answer[i]] = true;
        let stop = false;
        for (let poemIndex = 0; poemIndex < data.length && stop === false; poemIndex++) {
            for (let lineIndex = 0; lineIndex < data[poemIndex].lyrics.length && stop === false; lineIndex++) {
                let hit = false;
                for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                    const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                    if (word === associativeWord[0] || word  === associativeWord[1])
                        hit = true;
                }

                if (hit === true) {
                    // Insert word it Pool and List
                    for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                        const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                        if (wordPool[word] !== true) {
                            wordPool[word] = true;
                            wordList = wordList + word;
                        }
                    }
                }

                if (wordList.length > 30)
                    stop = true;
            }
        }

        // If not enough word, just add anyword topdown
        if (wordList.length < 30) {
            stop = false;
            for (let poemIndex = 0; poemIndex < data.length && stop === false; poemIndex++) {
                for (let lineIndex = 0; lineIndex < data[poemIndex].lyrics.length && stop === false; lineIndex++) {
                    for (let wordIndex = 0; wordIndex < data[poemIndex].lyrics[lineIndex].length; wordIndex++) {
                        const word = data[poemIndex].lyrics[lineIndex][wordIndex];
                        if (wordPool[word] !== true) {
                            wordPool[word] = true;
                            wordList = wordList + word;
                        }
                    }
                    if (wordList.length > 30)
                        stop = true;
                }
            }
            
        }
        wordList = wordList.substring(0, 30);
        //console.log(wordList);
        return wordList;
    }

    wordScore(answer) {
        let score = [0, 0, 0, 0, 0];
        data.forEach((poem) => {
            poem.lyrics.forEach((line) => {
                for (let i=0; i<5; i++) {
                    for (let j=0; j<5; j++) {
                        if (line[i] === answer[j])
                            score[j]++;
                    }
                }
            });
        });
        //console.log(score);
        let highScoreIndex1 = 0;
        for (let i = 1; i < 5; i++) {
            if (score[i] > score[highScoreIndex1])
                highScoreIndex1 = i;
        }
        let highScoreIndex2 = 0;
        if (highScoreIndex1 === 0)
            highScoreIndex2 = 1;
        for (let i = 1; i < 5; i++) {
            if (score[i] > score[highScoreIndex2] && i !== highScoreIndex1)
                highScoreIndex2 = i;
        }
        const result = [answer[highScoreIndex1], answer[highScoreIndex2]];
        //console.log(result);
        return result;
    }

    manualAnswers(index) {
        const answers = ['???????????????', '???????????????', '???????????????', '???????????????', '???????????????', '???????????????', '???????????????', '???????????????', '???????????????', '???????????????'];
        return answers[index % answers.length];
    }

    wordSampling() {
        let allword = "";
        data.forEach((poem) => {
            poem.lyrics.forEach((line) => {
                allword = allword + line;
            });
        });
        let wordMap = {};
        for (let i = 0; i < allword.length; i++) {
            if (wordMap[allword[i]] === undefined)
                wordMap[allword[i]] = 1;
            else
                wordMap[allword[i]]++;
        }
        let wordEntries = Object.entries(wordMap);
        wordEntries.sort((a, b) => b[1] - a[1]);
        console.log(wordEntries);

        // Results:
        /**
         * [ '???', 13 ], [ '???', 12 ], [ '???', 9 ], [ '???', 7 ], [ '???', 6 ],
            [ '???', 6 ],  [ '???', 5 ],  [ '???', 5 ], [ '???', 5 ], [ '???', 5 ],
            [ '???', 4 ],  [ '???', 4 ],  [ '???', 4 ], [ '???', 4 ], [ '???', 4 ],
            [ '???', 4 ],  [ '???', 4 ],  [ '???', 4 ], [ '???', 4 ], [ '???', 4 ],
            [ '???', 4 ],  [ '???', 4 ],  [ '???', 4 ], [ '???', 4 ], [ '???', 4 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 3 ],  [ '???', 3 ], [ '???', 3 ], [ '???', 3 ],
            [ '???', 3 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            [ '???', 2 ],  [ '???', 2 ],  [ '???', 2 ], [ '???', 2 ], [ '???', 2 ],
            ... 255 more items
         */
    }
}

//const pg = new problemGenerator(1);
//pg.wordSampling();

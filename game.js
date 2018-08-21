function HangmanWord() {
    function getRandom(max) {
        var min = 0;
        return Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
    }
    var words = [
        'Spotlight',
        'The Big Short',
        'Bridge of Spies',
        'Brooklyn',
        'Mad Max Furry Road',
        'The Martian',
        'The Revenant',
        'Room',
        'Birdman',
        'American Sniper',
        'Boyhood',
        'The Grand Budapest Hotel',
        'The Imitation Game',
        'Selma',
        'The Theory of Everything',
        'Whiplash',
        '12 Years a Slave',
        'American Hustle',
        'Captain Phillips',
        'Dallas Buyers Club',
        'Gravity',
        'Her',
        'Nebraska',
        'Philomena',
        'The Wolf of Wall Street',
        'Argo',
        'Amour',
        'Beasts of the Sourthern Wild',
        'Django Unchained',
        'Les Miserables',
        'Life of Pi',
        'Lincoln',
        'Silver Linings Playbook',
        'Zero Dark Thirty'
    ];
    return words[getRandom(words.length)];
}

module.exports = HangmanWord;
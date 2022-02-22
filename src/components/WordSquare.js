import progressColor from './progressColor';

export default function WordSquare({column, attempt, answer, currentRow, progressRow}) {
    let squareStyle = {
        fontSize: "4rem",
        paddingTop: "0",
        paddingBottom: "0.6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "0",
        border: "solid",
        borderColor: "grey",
        cursor: "default",
        color: "white",
        userSelect: "none"
    };
    let word = "一";
    if (attempt.length > column) {
        word = attempt[column];
        delete squareStyle.color;
        delete squareStyle.userSelect;
    }
    if (progressRow > currentRow) {
        // Give hint
        const progColor = new progressColor(answer);
        squareStyle['backgroundColor'] = progColor.getColor(word, column);
    }

    return <div style={squareStyle}>{word}</div>;
}
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount=1) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    },
    format_url: (urlString) => {
        return urlString
            .replace("http://", "")
            .replace("https://", "")
            .replace("www.", "")
            .split("/")[0]
            .split("?")[0];
    }
}


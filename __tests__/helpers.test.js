const {format_date, format_plural, format_url} = require("../utils/helpers");

// Test the date formatter
test("format_date() returns a date string", () => {
    const date = new Date("2022-03-25 11:27:00");

    expect(format_date(date)).toBe("3/25/2022");
});

// Test the plural formatting
test("Checks words to ensure they are pluralized only when appropriate", () => {
    const object = "Tiger";
    expect(format_plural(object, 2)).toBe("Tigers");
    expect(format_plural(object, 1)).toBe("Tiger");
    expect(format_plural(object)).toBe("Tiger");
    
});

// Test reformatting of URLs on the homepage and articles
test("format_url() returns a simplified URL string", () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});
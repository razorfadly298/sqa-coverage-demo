const { calculateGrade } = require('../src/grade');

describe('Grade Calculator', () => {
  test('A untuk 90-100', () => {
    expect(calculateGrade(95)).toBe('A');
    expect(calculateGrade(90)).toBe('A');
  });
  test('B untuk 80-89', () => {
    expect(calculateGrade(85)).toBe('B');
  });
  test('C untuk 70-79', () => {
    expect(calculateGrade(75)).toBe('C');
  });
  test('D untuk 60-69', () => {
    expect(calculateGrade(65)).toBe('D');
  });
  test('E untuk < 60', () => {
    expect(calculateGrade(50)).toBe('E');
  });
  test('Error untuk invalid score', () => {
    expect(() => calculateGrade(-1)).toThrow();
    expect(() => calculateGrade(101)).toThrow();
  });
});

const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

//Test Cases

describe("Todo New Test Suite", () => {
  beforeAll(() => {
    add({
      title: "New Test",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Play Cricket",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Repeat Work",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("new todo", () => {
    const todoItemsCounts = all.length;
    add([
      {
        title: "Overdue",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10),
      },
    ]);
    expect(all.length).toBe(todoItemsCounts + 1);
  });

  test("marktodo complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Overdue", () => {
    expect(
      all.filter((item) => item.dueDate < new Date().toISOString().slice(0, 10))
        .length
    ).toBe(1);
    add({
      title: "free wifi",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(
      all.filter((item) => item.dueDate < new Date().toISOString().slice(0, 10))
        .length
    ).toBe(2);
  });

  test("retreive due today", () => {
    expect(
      all.filter(
        (item) => item.dueDate === new Date().toISOString().slice(0, 10)
      ).length
    ).toBe(1);
    add({
      title: "Race the bike",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(
      all.filter(
        (item) => item.dueDate === new Date().toISOString().slice(0, 10)
      ).length
    ).toBe(2);
  });
});

test("retreive the Overdue", () => {
  expect(
    all.filter((item) => item.dueDate > new Date().toISOString().slice(0, 10))
      .length
  ).toBe(1);
  add({
    title: "Checkingg",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10),
  });
  expect(
    all.filter((item) => item.dueDate > new Date().toISOString().slice(0, 10))
      .length
  ).toBe(2);
});

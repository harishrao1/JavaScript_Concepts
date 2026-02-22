const employees = {
  id: 1,
  name: "CEO",
  children: [
    {
      id: 2,
      name: "Manager",
      children: [{ id: 5, name: "Dev" }],
    },
    {
      id: 3,
      name: "Manager-2",
      children: [{ id: 6, name: "Dev" }],
    },
    {
      id: 4,
      name: "Manager-3",
      children: [{ id: 7, name: "Dev" }],
    },
  ],
};
const findEmployee = (employee, id) => {
  if ((!employee, !id)) {
    return null;
  }

  if (employee.id === id) return employee;

  if (
    !employee.children ||
    !Array.isArray(employee.children) ||
    employee.children.length > 0
  ) {
    return null;
  }

  for (let child of employee.children) {
    const result = findEmployee(child, id);
    if (result) return result;
  }
  return null;
};

console.log(findEmployee(employees, 3));
console.log(findEmployee(employees, 7));
console.log(findEmployee(employees, 1));
console.log(findEmployee(employees, 787));

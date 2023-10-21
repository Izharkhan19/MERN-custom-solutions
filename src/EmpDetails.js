import React, { useState } from "react";

function EmpDetails() {
  const [Submit, setSubmit] = useState("");
  const [EmpRemove, setRemove] = useState([]);
  const [Emp, setEmp] = useState([
    {
      Id: 1,
      Name: "Nayan",
      Dept: "React Js",
      Email: "nayan.kalasha2222@gmail.com",
      Sallary: 30000,
    },
    {
      Id: 2,
      Name: "Manan",
      Dept: "Node Js",
      Email: "nayan.ka2222@gmail.com",
      Sallary: 50000,
    },
    {
      Id: 3,
      Name: "Satish",
      Dept: "Php",
      Email: "satish.kalasha2222@gmail.com",
      Sallary: 40000,
    },
    {
      Id: 4,
      Name: "patel",
      Dept: "Php",
      Email: "nayan.kalasha2222@gmail.com",
      Sallary: 1000,
    },
    {
      Id: 5,
      Name: "Nayan",
      Dept: "Php",
      Email: "nayan.kalasha2222@gmail.com",
      Sallary: 10000,
    },
  ]);
  let Dept = [];

  Dept = Emp.map((item) => {
    return item.Dept;
  });
  Dept = new Set(Dept);
  Dept = [...Dept];

  const removeSecond = (ID) => {
    var i = Emp.indexOf(Emp.filter((itm) => itm.Id === ID)[0]);
    let temp = [...Emp];
    temp.splice(i, 1);
    ;
    setEmp(temp);
    // setRemove((Emp) =>
    //   Emp.filter((Id) => Emp.id )
    // );
  };

  return (
    <div>
      {Emp.length > 0 &&
        Dept.map((item) => (
          <>
            {item}
            {Emp.filter((i) => i.Dept === item).map((data) => {
              return (
                <div>
                  <form
                    onSubmit={(e) => {
                      setSubmit(e.target.value);
                      e.preventDefault();
                    }}
                  >
                    {Submit}

                    <p>
                      Emp Name is a {data.Name} , Emp Email is a {data.Email}{" "}
                      ,Emp Sallary is a {data.Sallary}
                      <button onClick={(e) => removeSecond(data.Id)}>
                        {" "}
                        Delet Me !!
                      </button>
                    </p>
                  </form>
                </div>
              );
            })}
          </>
        ))}
    </div>
  );
}

export default EmpDetails;

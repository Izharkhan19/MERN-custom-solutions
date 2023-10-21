import React, { useEffect, useState } from "react";

const NodeCRUD = () => {
  const [first, setfirst] = useState(1);
  const [getNotes, setGetNotes] = useState([]);
  const [handleNotes, setHandleNotes] = useState({
    id: "",
    title: "",
    content: "",
  });

  function SubmitNote() {
    if (!handleNotes.id) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: handleNotes.title,
          content: handleNotes.content,
        }),
      };
      fetch("http://localhost:3000/notes", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setHandleNotes({
          //   title: "",
          //   content: "",
          // });
          // fetchNotes();
          setfirst(first + 1);
        });
    } else {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: handleNotes.title,
          content: handleNotes.content,
        }),
      };
      fetch(`http://localhost:3000/notes/${handleNotes.id}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setHandleNotes({
          //   title: "",
          //   content: "",
          // });
          // fetchNotes();
          setfirst(first + 1);
        });
    }
  }

  function fetchNotes() {
    fetch("http://localhost:3000/notes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGetNotes(data);
      });
  }

  function deleteNote(data) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noteId: data,
      }),
    };
    fetch(`http://localhost:3000/notes/${data}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetchNotes();
      });
  }

  function updateNote(data) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     noteId: data,
      //   }),
    };
    fetch(`http://localhost:3000/notes/${data}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setHandleNotes({
          id: data._id,
          title: data.title,
          content: data.content,
        });
      });
  }

  useEffect(() => {
    fetchNotes();

    return () => {
      setHandleNotes({
        title: "",
        content: "",
      });
    };
  }, [first]);

  return (
    <div>
      NodeCRUD
      <br />
      <br />
      <br />
      &nbsp;&nbsp;&nbsp;
      <input
        type="text"
        value={handleNotes.title}
        onChange={(e) =>
          setHandleNotes({
            ...handleNotes,
            title: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={handleNotes.content}
        onChange={(e) =>
          setHandleNotes({
            ...handleNotes,
            content: e.target.value,
          })
        }
      />
      <button onClick={SubmitNote}>Add Note</button>
      <br />
      <br />
      <table>
        {getNotes.length > 0 &&
          getNotes.map((itm) => (
            <>
              <tr>
                <td>
                  <h3>{itm.title}</h3>
                </td>
                <td>
                  <p>{itm.content}</p>
                </td>
                <td>
                  <button onClick={() => updateNote(itm._id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => deleteNote(itm._id)}>Delete</button>
                </td>
              </tr>
            </>
          ))}
      </table>
    </div>
  );
};

export default NodeCRUD;

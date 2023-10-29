import React, { useState, useEffect } from "react";
import { apiCall } from "../../Service/infService";

function ChatGPT() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getClubList() {
    try {
      setIsLoading(true);
      let totalPost = document.getElementsByClassName("data-post");
      debugger;
      let body = {
        timezone: "Asia/Kolkata",
        latitude: "",
        longitude: "",
        sort_by: "",
        slot_type: "",
        distance: "",
        game_type: "",
        start_date: "10/27/2023",
        end_date: "10/27/2023",
        search: "",
        page: (totalPost.length / 10 + 1).toString(),
        limit: "10",
      };

      let resData = await apiCall(
        {
          method: "POST",
          url: "https://qa.picklerclubs.com/api/v1/club/list",
          body: body,
        },
        false
      );
      let response = resData.data.list;
      // setData((prevData) => [...prevData, ...response]);
      debugger;
      let a = data;
      let OldPostID = "";
      a.forEach((element) => {
        OldPostID = OldPostID + "#" + element.club_id + "#";
      });
      response.forEach((element) => {
        if (OldPostID.indexOf("#" + element.club_id + "#") < 0) {
          a.push(element);
        }
      });
      debugger;
      setData([...a]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      getClubList();
    }
  };

  useEffect(() => {
    getClubList();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div style={{ height: "100vh" }}>
        {data.map((item, postindx) => (
          <div key={item.club_id} className="data-post">
            <tr>
              <td>
                {postindx + " : " + item.club_id} {item.club_name}
              </td>
            </tr>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default ChatGPT;

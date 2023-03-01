import { Button } from "antd";
import React, { useState } from "react";

export default function Seach() {
  const [data, setdata] = useState([
    {
      emoji: "💯 100",
    },
    {
      emoji: " 🔢 1234",
    },
    { emoji: "😀 Grining" },
    { emoji: "😁 Grin" },
    { emoji: " 😂 Joy" },
    { emoji: "😃 Smiley" },
    { emoji: "😄 Smile" },
    { emoji: "😅 Sweat Smile" },
    { emoji: " 😆 Laughing" },
    { emoji: "😇 Innocent" },
    { emoji: " 😉 Wink" },
  ]);
  const [search, setSearch] = useState("");

  const searchItem = data.filter((item) => {
    if (search == "") {
      return item;
    } else if (item.emoji?.toLowerCase().includes(search?.toLowerCase())) {
      return item;
    }
  });

  console.log("Searched Item : ", searchItem);

  return (
    <div>
      <h1>Emoji search</h1>
      <input
        style={{
          width: "98%",
          height: "3rem",
          fontSize: "2rem",
          borderRadius: "0.5rem",
          borderWidth: "0.2rem",
          borderColor: "black",
          color: "gray",
        }}
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      {searchItem &&
        searchItem.map((t, key) => {
          return (
            <div style={{ marginTop: "1rem" }} key={key}>
              <Button
                type={"button"}
                style={{
                  width: "100%",
                  height: "3rem",
                  borderColor: "gray",
                  borderWidth: "0.1rem",
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "1.5rem",
                }}
              >
                {t.emoji}
              </Button>
            </div>
          );
        })}
    </div>
  );
}

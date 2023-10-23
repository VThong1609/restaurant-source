import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import {  useNavigate } from "react-router-dom";
import { TbExternalLink } from "react-icons/tb";
import Notification from "./Notification";

const LongTextComponent = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleCopy = () => {
    if (localStorage.getItem("token")) setIsCopied(true);
    else setMessage("Vui long dang nhap");
  };

  return (
    <>
      <Notification message={message} setMessage={setMessage} />

      <span style={{ marginRight: "10px" }}>
        {text.substring(0, 7) + "..." + text.substring(text.length - 4)}
      </span>
      <CopyToClipboard
        text={text}
        onMouseOver={(e) => {
          e.target.style.cursor = "pointer";
        }}
        onCopy={handleCopy}
      >
        {!isCopied ? (
          <LuCopy size={20} onClick={handleCopy}></LuCopy>
        ) : (
          <LuCopyCheck size={20} color={"green"}></LuCopyCheck>
        )}
      </CopyToClipboard>
      <TbExternalLink
        onMouseOver={(e) => {
          e.target.style.cursor = "pointer";
        }}
        style={{ marginLeft: "10px" }}
        size={20}
        onClick={(event) => {
          if (localStorage.getItem("token"))
            navigate("/Transaction?transaction_hash=" + text);
          else setMessage("Vui long dang nhap");
        }}
      ></TbExternalLink>
    </>
  );
};

export default LongTextComponent;

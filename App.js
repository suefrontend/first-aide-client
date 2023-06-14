import React, { useEffect, useState } from "react";
import Landing from "./screens/Landing";
import Instruction from "./screens/Instruction";

// export default function App() {
//   const [showInstruction, setShowInstruction] = useState(true);
//   const [instructionText, setInstructionText] = useState(null);
//   const [bookmark, setBookmark] = useState(null); // bookmarked instruction text

//   useEffect(() => {
//     setInstructionText("Hello, this is text.");
//   }, []);

//   showInstruction ? (
//     <Instruction
//       setShowInstruction={setShowInstruction}
//       instructionText={instructionText}
//       setInstructionText={setInstructionText}
//       bookmark={bookmark}
//       setBookmark={setBookmark}
//     />
//   ) : (
//     <Landing setShowInstruction={setShowInstruction} />
//   );
// }

export default function App() {
  const [showInstruction, setShowInstruction] = useState(true);
  const [instructionText, setInstructionText] = useState(null);
  const [bookmark, setBookmark] = useState(null); // bookmarked instruction text

  return showInstruction ? (
    <Instruction
      setShowInstruction={setShowInstruction}
      instructionText={instructionText}
      setInstructionText={setInstructionText}
      bookmark={bookmark}
      setBookmark={setBookmark}
    />
  ) : (
    <Landing setShowInstruction={setShowInstruction} />
  );
}

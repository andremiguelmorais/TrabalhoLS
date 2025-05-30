import React, { useEffect } from "react";
import Confetti from "react-confetti";
import "./modal.css";

export default function WinnerModal({ winner, onClose }) {
  // Fecha o modal após 5 segundos
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <Confetti recycle={false} numberOfPieces={300} />
      <div className="modal-content">
        <h2>🎉 {winner} venceu! 🎉</h2>
      </div>
    </div>
  );
}
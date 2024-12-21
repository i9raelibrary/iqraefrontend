import React, { useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './WhatsIconFix.css';

const WhatsIconFix = () => {
    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState('');

    function handleSendMessage() {
        const nemeroTell = "+212767194500";
        const URL = `https://web.whatsapp.com/send?phone=${nemeroTell}&text=${encodeURIComponent(message)}`;

        window.open(URL, '_blank').focus();
    }

    return (
        <div className="whatsapp-container">
            {/* WhatsApp Button */}
            <div
                className="whatsapp-icon"
                onClick={() => setShowInput(!showInput)}
            >
                <WhatsAppIcon sx={{ fontSize: "35px" }} />
            </div>

            {/* Input for Message */}
            {showInput && (
                <div className="whatsapp-input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="whatsapp-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default WhatsIconFix;

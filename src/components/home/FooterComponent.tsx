import React from 'react';

export const FooterComponent: React.FC = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                pointerEvents: 'none',
                color: 'rgba(0,0,0,0.4)',
                fontSize: '1rem',
                fontStyle: 'italic',
                userSelect: 'none',
                zIndex: 1000
            }}
        >
            @Lucas Henrique Fischer
        </div>
    );
};
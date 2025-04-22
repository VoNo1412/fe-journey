import { useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FilePreview = ({ files }: any) => {
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  const handleOpen = (imgPath: string) => {
    setCurrentImg(imgPath);
    setOpen(true);
    document.body.style.overflow = 'hidden'; // 🚫 ngăn scroll nền sau khi mở
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImg(null);
    document.body.style.overflow = 'auto'; // ✅ khôi phục scroll
  };

  return (
    <>
      {files.map((file: any) => {
        const isImage = file.mimeType?.startsWith('image/');
        const isPDF = file.mimeType === 'application/pdf';
        const isDoc =
          file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        return (
          <div key={file.id} className="file-preview" style={{ marginBottom: '15px' }}>
            <p><strong>Resource:</strong></p>

            {isImage && (
              <img
                src={file.filePath}
                alt={file.originalName}
                style={{
                  maxWidth: '100px',
                  height: 'auto',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  border: '1px solid #ccc'
                }}
                onClick={() => handleOpen(file.filePath)}
              />
            )}

            {isPDF && (
              <iframe
                src={file.filePath}
                width="100%"
                height="500px"
                title={file.originalName}
              />
            )}

            {isDoc && (
              <a
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(file.filePath)}&embedded=true`}
                target="_blank"
                rel="noreferrer"
              >
                📄 Preview in Google Viewer
              </a>
            )}

            {!isImage && !isPDF && !isDoc && (
              <a href={file.filePath} target="_blank" rel="noreferrer">
                📎 Download
              </a>
            )}
          </div>
        );
      })}

      {/* Fullscreen image preview overlay */}
      {open && currentImg && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1300,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            overflowY: 'auto', // ✅ Scroll toàn trang
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'fixed',
              top: '20px',
              right: '30px',
              color: 'white',
              zIndex: 1400,
            }}
          >
            <CloseIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <img
            src={currentImg}
            alt="Preview"
            style={{
              maxWidth: '40vw',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
              cursor: 'default'
            }}
          />
        </div>
      )}
    </>
  );
};

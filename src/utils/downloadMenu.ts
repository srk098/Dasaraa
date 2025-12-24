import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadMenu = async (
  images: string[],
  filename: string,
  setLoading: (val: boolean) => void
) => {
  try {
    setLoading(true);
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = images[i];

      await new Promise<void>((resolve, reject) => {
        img.onload = async () => {
          const canvas = await html2canvas(img, {
            useCORS: true,
            scale: 2
          });

          const imgData = canvas.toDataURL("image/jpeg");
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (i !== 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
          resolve();
        };

        img.onerror = (err) => reject(err);
      });
    }

    pdf.save(filename);
  } catch (err) {
    console.error("Error generating PDF:", err);
  } finally {
    setLoading(false);
  }
};

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default async function generatePDF(){

const element = document.getElementById("resume-preview")

if(!element){

alert("Resume preview not found")

return

}

const canvas = await html2canvas(element)

const imgData = canvas.toDataURL("image/png")

const pdf = new jsPDF("p","mm","a4")

const imgWidth = 210


const imgHeight = canvas.height * imgWidth / canvas.width

pdf.addImage(imgData,"PNG",0,0,imgWidth,imgHeight)

pdf.save("resume.pdf")

}
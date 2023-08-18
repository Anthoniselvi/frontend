import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import "./Faq.css";

export default function Faq() {
  const [expanded, setExpanded] = useState("panel1");

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      <div className="faq-content">
        <Accordion
          className="accord-container"
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel1" ? (
                <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              ) : (
                <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className="accord-subhead">Accordion 1</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel2" ? (
                <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              ) : (
                <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              )
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <p className="accord-subhead">Accordion 2</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel3"}
          onChange={handleAccordionChange("panel3")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel3" ? (
                <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              ) : (
                <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
              )
            }
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <p className="accord-subhead">Accordion 3</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

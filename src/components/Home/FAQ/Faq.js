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
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className="accord-subhead">What is GiftRegistry?</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              GiftRegistry is a user-friendly web application designed to help
              you track and manage all the gifts you receive for various
              occasions. It serves as a central hub for recording gift details,
              expressing gratitude, and organizing your gift history.
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
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <p className="accord-subhead">How does GiftRegistry work?</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              GiftRegistry allows you to easily record the details of each gift
              you receive, including the occasion, gift type, giver's
              information, and any personalized notes. You can categorize and
              search through your gift history, set reminders, and generate
              reports to keep track of your gifts in one convenient place.
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
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <p className="accord-subhead">
              Can I add images to my gift entries?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Yes! With GiftRegistry, you can enhance your gift entries by
              uploading images of the gifts you've received. This visual element
              adds a personal touch and helps you cherish the memories
              associated with each gift.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel4"}
          onChange={handleAccordionChange("panel4")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel4" ? (
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <p className="accord-subhead">Is my gift information secure?</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Absolutely! GiftRegistry takes your privacy and security
              seriously. We employ industry-standard security measures to
              protect your gift information. Your data is stored securely, and
              we will never share your information with any third parties.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel5"}
          onChange={handleAccordionChange("panel5")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel5" ? (
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <p className="accord-subhead">
              Can I generate reports from my gift history?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Yes! GiftRegistry offers a reporting feature that allows you to
              generate comprehensive reports based on your gift history. You can
              gain insights such as the total number of gifts received, the
              value of gifts, and the most common gift types or occasions.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel6"}
          onChange={handleAccordionChange("panel6")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel6" ? (
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <p className="accord-subhead">
              Can I share my gift history with others?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              GiftRegistry provides options for sharing your gift history with
              friends and family. You can choose to share specific gifts or your
              entire gift registry, making it easier for others to know your
              preferences and avoid duplicate gifts.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel7"}
          onChange={handleAccordionChange("panel7")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel7" ? (
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <p className="accord-subhead">
              Can I use GiftRegistry for different occasions?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Absolutely! GiftRegistry is designed to accommodate various
              occasions such as birthdays, weddings, anniversaries, holidays,
              and more. You can create separate sections or registries for each
              occasion, making it easy to manage and remember gifts for every
              special event.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accord-container"
          expanded={expanded === "panel8"}
          onChange={handleAccordionChange("panel8")}
        >
          <AccordionSummary
            expandIcon={
              expanded === "panel8" ? (
                <RemoveCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              ) : (
                <AddCircleOutlineIcon
                  sx={{ color: "#DA344D", fontSize: "22px" }}
                />
              )
            }
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <p className="accord-subhead">
              Can I access GiftRegistry from different devices?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="accord-para">
              Yes! GiftRegistry is a web-based application that can be accessed
              from any device with an internet connection. You can conveniently
              log in and manage your gift history from your computer,
              smartphone, or tablet.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-block">
        <div className="footer_res">
          <div className="row-1">
            <h2>Our Mission</h2>
            <p>
              Store ypur notes on cloud and save . Share it with friends and
              give reviews to users and protect your notes
            </p>
          </div>
          <div className="footer__absolute">
            <div className="footer__absolute_sub">
              <div className="office_main">
                <NoteOutlinedIcon className="footer_icons" />
                <h2>Notes for future</h2>
                <p>Save notes on cloud</p>
              </div>
              <hr className="footer__vertical" />
              <div className="office_main">
                <TipsAndUpdatesOutlinedIcon className="footer_icons" />
                <h2>Information</h2>
                <p>Content is king</p>
              </div>
              <hr className="footer__vertical" />
              <div className="office_main">
                <CommentsDisabledOutlinedIcon className="footer_icons" />
                <h2>Connect</h2>
                <p>Connect with people</p>
              </div>
              <hr className="footer__vertical" />
            </div>
          </div>
          <div className="row-2 noman">
            <h2>Pages</h2>
            <ul>
              <li>
                <Link href="/mynotes">My Notes</Link>
              </li>
              <li>
                <Link to="/">User Notes</Link>
              </li>
              <li>
                <Link to="/message">Message</Link>
              </li>
            </ul>
          </div>
          <div className="row-2 noman1">
            <h2>Features</h2>
            <ul>
              <li>Share Notes</li>
              <li>Save Notes</li>
              <li>Read Notes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>iCloudNotbook App &copy; Copyright || All Right Reserved 2023</p>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useEffect, useState } from "react";
import { ref, get, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { getUserById } from "@/app/providers/getUser/getUser";

const CreateRankings = () => {
  const [showConditional, setShowConditional] = useState(false);
  const [author, setAuthor] = useState();
  const [formValues, setFormValues] = useState({
    title: "",
    format: "",
    rankTeamLayout: "",
    qb: 0,
    rb: 0,
    wr: 0,
    te: 0,
    teamSuperflex: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const defaultTeamLayouts = {
    standard: {
      qb: 1,
      rb: 2,
      wr: 2,
      te: 1,
      flex: 1,
    },
    "3wr": {
      qb: 1,
      rb: 2,
      wr: 3,
      te: 1,
      flex: 1,
    },
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchUser = async() => {
      const data = await getUserById(user.uid);
      if(data) {
        setAuthor(data.username)
      } else {
        setAuthor(null)
      }
    }

    fetchUser();
  }, [])

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update position counts based on rankTeamLayout
  useEffect(() => {
    if (formValues.rankTeamLayout === "custom") {
      setShowConditional(true);
    } else {
      setShowConditional(false);
      if (formValues.rankTeamLayout && defaultTeamLayouts[formValues.rankTeamLayout]) {
        const layout = defaultTeamLayouts[formValues.rankTeamLayout];
        setFormValues((prev) => ({
          ...prev,
          qb: layout.qb,
          rb: layout.rb,
          wr: layout.wr,
          te: layout.te,
        }));
      }
    }
  }, [formValues.rankTeamLayout]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to create a ranking.");
      return;
    }

    try {
      // Fetch the rankr-ppr-template
      const templateRef = ref(db, "rankr-ppr-template");
      const templateSnapshot = await get(templateRef);
      if (!templateSnapshot.exists()) {
        throw new Error("Template not found in rankr-ppr-template node");
      }
      const templatePlayerIds = templateSnapshot.val();

      // Create the format object for the database
      const format = {
        QB: parseInt(formValues.qb) || 0,
        RB: parseInt(formValues.rb) || 0,
        WR: parseInt(formValues.wr) || 0,
        TE: parseInt(formValues.te) || 0,
        FLEX: defaultTeamLayouts[formValues.rankTeamLayout]?.flex || 1, // Default FLEX to 1 for custom
      };

      // Create the new ranking object
      const newRanking = {
        title: formValues.title || "New PPR Ranking",
        type: formValues.format ? formValues.format : "redraft",
        format,
        playerIds: templatePlayerIds,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPrivate: false, 
        uid: user.uid,
        superFlex: formValues.teamSuperflex,
        author: author ? author : "none"
      };

      // Save to /rankings
      const rankingsRef = ref(db, "rankings");
      const newRankingRef = push(rankingsRef);
      await set(newRankingRef, newRanking);

      setSuccess(`Ranking created with ID: ${newRankingRef.key}`);
      // Reset form
      setFormValues({
        title: "",
        format: "",
        rankTeamLayout: "",
        qb: 0,
        rb: 0,
        wr: 0,
        te: 0,
        teamSuperflex: false,
      });
    } catch (err) {
      setError(`Failed to create ranking: ${err.message}`);
    }
  };

  return (
    <div className="form-wrapper">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form id="rankFormat" className="flex" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Rankings Title:
          <input
            placeholder="Jordan's 2025 10-Man Full PPR Rankings"
            type="text"
            name="title"
            id="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="format">
          Rankings Format:
          <select
            name="format"
            id="format"
            value={formValues.format}
            onChange={handleChange}
            required
          >
            <option value="">Choose Format</option>
            <option value="redraft">Redraft (Most Popular)</option>
            <option value="bestball">Best Ball</option>
            <option value="dynasty">Dynasty</option>
          </select>
        </label>
        <label htmlFor="rankTeamLayout">
          Rankings Team Layout:
          <select
            name="rankTeamLayout"
            id="rankTeamLayout"
            value={formValues.rankTeamLayout}
            onChange={handleChange}
            required
          >
            <option value="">Choose Team Layout</option>
            <option value="standard">Standard (1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX)</option>
            <option value="3wr">3 WR (1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX)</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {showConditional && (
          <>
            <label htmlFor="qb">
              Number of QBs:
              <select
                name="qb"
                id="qb"
                value={formValues.qb}
                onChange={handleChange}
                required
              >
                <option value="">Number of QBs</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
            <label htmlFor="rb">
              Number of RBs:
              <select
                name="rb"
                id="rb"
                value={formValues.rb}
                onChange={handleChange}
                required
              >
                <option value="">Number of RBs</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label htmlFor="wr">
              Number of WRs:
              <select
                name="wr"
                id="wr"
                value={formValues.wr}
                onChange={handleChange}
                required
              >
                <option value="">Number of WRs</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label htmlFor="te">
              Number of TEs:
              <select
                name="te"
                id="te"
                value={formValues.te}
                onChange={handleChange}
                required
              >
                <option value="">Number of TEs</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
          </>
        )}
        <label htmlFor="teamSuperflex" className="formCheckbox">
          <input
            type="checkbox"
            id="teamSuperflex"
            name="teamSuperflex"
            checked={formValues.teamSuperflex}
            onChange={handleChange}
          />
          Allow QB in FLEX (Superflex)
        </label>
        <button type="submit" className="btn main generate">
          Generate
        </button>
      </form>
    </div>
  );
};

export default CreateRankings;
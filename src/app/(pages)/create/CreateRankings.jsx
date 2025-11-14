"use client";

import { useEffect, useState } from "react";
import { ref, get, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { getUserById } from "@/app/providers/getUser/getUser";
import Button from "@/app/components/arcButton/button";
import LeagueFormat from "./LeagueFormat";

const CreateRankings = () => {
  const [showConditional, setShowConditional] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    teams: "",
    format: "",
    rankTeamLayout: "",
    qb: "",
    rb: "",
    wr: "",
    te: "",
    flex: "",
    superflex: "",
    scoring: "",
    teamSuperflex: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const defaultTeamLayouts = {
    standard: {
      qb: 1,
      rb: 2,
      wr: 2,
      te: 1,
      flex: 1,
      superflex: 0,
    },
    "3wr": {
      qb: 1,
      rb: 2,
      wr: 3,
      te: 1,
      flex: 1,
      superflex: 0,
    },
    superflex: {
      qb: 1,
      rb: 2,
      wr: 2,
      te: 1,
      flex: 0,
      superflex: 1,
    },
  };

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const user = await getUserById(uid);

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
        FLEX: parseInt(formValues.flex || 0), // Default FLEX to 1 for custom
        SUPERFLEX: parseInt(formValues.superflex) || 0,
      };

      // Create the new ranking object
      const newRanking = {
        title: formValues.title || "New PPR Ranking",
        teams: formValues.teams || "12",
        type: formValues.format ? formValues.format : "redraft",
        format,
        scoring: formValues.scoring,
        playerIds: templatePlayerIds,
        createdAt: new Date().toISOString(),
        updatedAt: "",
        isPrivate: false, 
        superFlex: formValues.teamSuperflex,
        author: user ? user.username : "none",
        uid: uid
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
      router.push(`/rankings/${newRankingRef.key}`);
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
          Title
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
        <label htmlFor="teams">
          Number of teams
          <select
            name="teams"
            id="teams"
            value={formValues.teams}
            onChange={handleChange}
            required
          >
            <option value="">Choose number of teams</option>
            <option value="4">4 teams</option>
            <option value="6">6 teams</option>
            <option value="8">8 teams</option>
            <option value="10">10 teams</option>
            <option value="12">12 teams</option>
            <option value="14">14 teams</option>
            <option value="16">16 teams</option>
            <option value="18">18 teams</option>
            <option value="20">20 teams</option>
            <option value="22">22 teams</option>
            <option value="24">24 teams</option>
            <option value="32">32 teams</option>
          </select>
        </label>
        <label htmlFor="format">
          Ranking Positions
          <div className='format-wrapper'>
            <LeagueFormat
              title="All"
              desc="Your ranking will include QB, RB, WR, TE"
              value={"all"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"} 
            />
            <LeagueFormat
              title="QB's"
              desc="Your ranking will only include quarterbacks"
              value={"qb"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="RB's"
              desc="Your ranking will only include running backs"
              value={"rb"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="WR's"
              desc="Your ranking will only include wide receivers"
              value={"wr"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="TE's"
              desc="Your ranking will only include tight ends"
              value={"te"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="Rookies"
              desc="Your ranking will only include rookies"
              value={"rookie"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
          </div>
        </label>
        <label htmlFor="format">
          League format
          <div className='format-wrapper'>
            <LeagueFormat
              title="Redraft"
              desc="Rosters reset after the fantasy season"
              value={"redraft"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"} 
            />
            <LeagueFormat
              title="Keeper"
              desc="Each owner can keep designated players for next season"
              value={"keeper"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="Dynasty"
              desc="All rosters stay with their team owners"
              value={"dynasty"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
            <LeagueFormat
              title="Don't Specify"
              desc="Your ranking will not display a league format"
              value={""}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"format"}
            />
          </div>
        </label>
        <label htmlFor="rankTeamLayout">
          Team layout
          <div className='format-wrapper'>
            <LeagueFormat
              title="Standard"
              desc="1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX"
              value={"standard"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"rankTeamLayout"}
            />
            <LeagueFormat
              title="3 WR"
              desc="1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX"
              value={"3wr"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"rankTeamLayout"}
            />
            <LeagueFormat
              title="Superflex"
              desc="1 QB, 2 RB, 2 WR, 1 TE, 1 SUPERFLEX"
              value={"superflex"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"rankTeamLayout"}
            />
            <LeagueFormat
              title="Custom"
              desc="Build your own team composition"
              value={"custom"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"rankTeamLayout"}
            />
            <LeagueFormat
              title="Don't Specify"
              desc="Your ranking will not display a team layout"
              value={""}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"rankTeamLayout"}
            />
          </div>
          {/* <select
            name="rankTeamLayout"
            id="rankTeamLayout"
            value={formValues.rankTeamLayout}
            onChange={handleChange}
            required
          >
            <option value="">Choose team layout</option>
            <option value="standard">Standard (1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX)</option>
            <option value="3wr">3 WR (1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX)</option>
            <option value="superflex">Superflex (1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX, 1 Superflex)</option>
            <option value="custom">Custom</option>
          </select> */}
        </label>
        {showConditional && (
          <>
            <label htmlFor="qb">
              Number of QBs
              <select
                name="qb"
                id="qb"
                value={formValues.qb}
                onChange={handleChange}
                required
              >
                <option value="">Number of QBs</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
            <label htmlFor="rb">
              Number of RBs
              <select
                name="rb"
                id="rb"
                value={formValues.rb}
                onChange={handleChange}
                required
              >
                <option value="">Number of RBs</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label htmlFor="wr">
              Number of WRs
              <select
                name="wr"
                id="wr"
                value={formValues.wr}
                onChange={handleChange}
                required
              >
                <option value="" defaultChecked>Number of WRs</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label htmlFor="te">
              Number of TEs
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
            <label htmlFor="flex">
              Number of flex spots
              <select
                name="flex"
                id="flex"
                value={formValues.flex}
                onChange={handleChange}
                required
              >
                <option value="">Number of flex spots</option>
                <option value="0">0</option>
                <option value="1">1 (Recommended)</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </label>
            <label htmlFor="superflex">
              Number of superflex spots
              <select
                name="superflex"
                id="superflex"
                value={formValues.superflex}
                onChange={handleChange}
                required
              >
                <option value="">Number of superflex spots</option>
                <option value="0">0 (Recommended)</option>
                <option value="1">1 (Recommended)</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </label>
          </>
        )}
        <label htmlFor="scoring">
          Scoring
          <div className='format-wrapper'>
            <LeagueFormat
              title="PPR"
              desc="1 point per reception"
              value={"PPR"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"scoring"}
            />
            <LeagueFormat
              title="0.5 PPR"
              desc="0.5 point per reception"
              value={"0.5 PPR"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"scoring"}
             />
            <LeagueFormat
              title="Non-PPR"
              desc="0 points per reception"
              value={"Non-PPR"}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"scoring"}  
            />
            <LeagueFormat
              title="Don't Specify"
              desc="Your ranking will not display a scoring type"
              value={""}
              setFormValues={setFormValues}
              formValues={formValues}
              name={"scoring"}
            />
          </div>
        </label>
        <div className="ranking-btn-wrapper">
          <Button style={"white full"} text={"Create Ranking"} type={"submit"}></Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRankings;
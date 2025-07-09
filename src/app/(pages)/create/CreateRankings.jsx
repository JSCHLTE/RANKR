"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CreateRankings = () => {

    const [setupRankings, setSetupRankings] = useState(null);
    const [showConditional, setShowConditional] = useState(null);
    const [formValues, setFormValues] = useState({
        rankTitle: "",
        rankFormat: "",
        rankTeamLayout: "",
        customQB: "",
        customRB: "",
        customWR: "",
        customTE: "",
        customFlex: "",
        teamSuperflex: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const defaultTeamLayouts = {
        "standard": {
            QB: 1,
            RB: 2,
            WR: 2,
            TE: 1,
            FLEX: 1,
        },
        "3wr": {
            QB: 1,
            RB: 2,
            WR: 3,
            TE: 1,
            FLEX: 1,
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('form submitted')
    }

    useEffect(() => {
        if(formValues.rankTeamLayout === "custom") {
            setShowConditional(true)
        } else {
            setShowConditional(null)
        }
    }, [formValues])

  return (
    <div className="form-wrapper">
        <form id="rankFormat" className="flex" onSubmit={handleSubmit}>
            <label htmlFor="rankTitle">
                Rankings Title:
                <input placeholder="Jordan's 2025 10-Man Full PPR Rankings" type="text" name="rankTitle" id="rankTitle" value={formValues.rankTitle} onChange={handleChange} required/>
            </label>
            <label htmlFor="rankFormat">
                Rankings Format:
                <select name="rankFormat" id="rankFormat" value={formValues.rankFormat} onChange={handleChange} required>
                    <option value="">Choose Format</option>
                    <option value="redraft">Redraft (Most Popular)</option>
                    <option value="bestball">Best Ball</option>
                    <option value="dynasty">Dynasty</option>
                </select>
            </label>
            <label htmlFor="rankTeamLayout">
                Rankings Team Layout:
                <select name="rankTeamLayout" id="rankTeamLayout" value={formValues.rankTeamLayout} onChange={handleChange} required>
                    <option value="">Choose Team Layout</option>
                    <option value="standard">Standard (1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX)</option>
                    <option value="3wr">3 WR (1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX)</option>
                    <option value="custom">Custom</option>
                </select>    
            </label>
            { showConditional ? 
            <>
            <label htmlFor="rankCustomQB">
                Number of QB's:
                <select name="customQB" id="rankCustomQB" value={formValues.customQB} onChange={handleChange} required>
                    <option value="">Number of QB's</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>    
            </label>
            <label htmlFor="rankCustomRB">
                Number of RB's:
                <select name="customRB" id="rankCustomRB" value={formValues.customRB} onChange={handleChange} required>
                    <option value="">Number of RB's</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>    
            </label>
            <label htmlFor="rankCustomWR">
                Number of WR's:
                <select name="customWR" id="rankCustomWR" value={formValues.customWR} onChange={handleChange} required>
                    <option value="">Number of WR's</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>    
            </label>
            <label htmlFor="rankCustomTE">
                Number of TE's:
                <select name="customTE" id="rankCustomTE" value={formValues.customTE} onChange={handleChange} required>
                    <option value="">Number of TE's</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>    
            </label>
            <label htmlFor="rankCustomFLEX">
                Number of FLEX Spots:
                <select name="customFlex" id="rankCustomFLEX" value={formValues.customFlex} onChange={handleChange} required>
                    <option value="">Number of FLEX Spots</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="2">3</option>
                </select>    
            </label>
            </>
            : ""}
            <label htmlFor="rankCustomSuperFLEX" className="formCheckbox">
                <input type="checkbox" id="rankCustomSuperFLEX" name="teamSuperflex" value={formValues.teamSuperflex}/> Allow QB in FLEX (Superflex)
            </label>
            <button type="submit" className="btn main generate">Generate</button>
        </form>
      </div>
  )
}

export default CreateRankings
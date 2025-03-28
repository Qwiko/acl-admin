import ClearIcon from '@mui/icons-material/Clear';
import { Card, CardContent, IconButton, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDataProvider, useRecordContext, useTheme } from "react-admin";
import DiffViewer from "react-diff-viewer-continued";
import { useParams } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";

export const RevisionCompare = () => {
    const record = useRecordContext();
    if (!record || !record.configs || record.configs.length == 0) return null;

    const dataProvider = useDataProvider();

    const [selectedTarget, setSelectedTarget] = useState("");

    const [revisions, setRevisions] = useState([]);
    const [selectedRevision1, setSelectedRevision1] = useState("");

    const [revision1Data, setRevision1Data] = useState([]);

    const [targets, setTargets] = useState([]);

    const [theme] = useTheme();
    const isDarkMode = theme === 'dark';

    const isMobile = useMediaQuery("(max-width:600px)");

    var type:string

    // Switch to useResourceContext?
    if (record.dynamic_policy_id != null) {
        type = "dynamic_policy_id"
    } else {
        type = "policy_id"
    }
    var revision1Config, revision2Config
    if (selectedTarget == "json_data") {
        if (revision1Data) { revision1Config = JSON.stringify(revision1Data.json_data, null, 4) }
        revision2Config = JSON.stringify(record.json_data, null, 4)
    } else {
        if (revision1Data.configs) { revision1Config = revision1Data.configs.find(config => config.target_id == selectedTarget)?.config }
        revision2Config = record.configs.find(config => config.target_id == selectedTarget)?.config
    }
    useEffect(() => {
        if (record.configs.length > 0) {
            dataProvider.getManyReference(`targets`, { filter: { id__in: record.configs.map((config) => config.target_id) }, pagination: { page: 1, perPage: 100 }, sort: { field: "id", order: "DESC" } })
                .then(({ data }) => { setTargets(data); setSelectedTarget(data[0]?.id) })
                .catch((error) => console.error("Error fetching revisions", error));
        }
    }, [dataProvider]);

    useEffect(() => {
        dataProvider.getList(`revisions`, { filter: { [type]: [parseInt(record[type])] }, pagination: { page: 1, perPage: 100 }, sort: { field: "id", order: "DESC" } })
            .then(({ data }) => setRevisions(data))
            .catch((error) => console.error("Error fetching revisions", error));
    }, [dataProvider]);

    useEffect(() => {
        if (selectedRevision1) {
            dataProvider.getOne(`revisions`, { id: selectedRevision1 })
                .then(({ data }) => setRevision1Data(data))
                .catch((error) => console.error("Error fetching revisions", error));
        }
    }, [dataProvider, selectedRevision1]);

    var splitView = (selectedRevision1 && record) && (!isMobile && selectedRevision1) ? true : false

    return (
        <Card>
            <CardContent>
                {/* Conditionally display Compare with Revision if there is actually a revision to compare to. */}
                {revisions.filter((revision) => revision.id != record.id).length > 0 && (
                    <>
                        <Typography variant="h6" style={{ marginTop: 16 }}>Compare with Revision</Typography>
                        <Select
                            value={selectedRevision1}
                            onChange={(e) => setSelectedRevision1(e.target.value)}
                            fullWidth
                            displayEmpty
                            style={{ marginBottom: 8 }}
                            endAdornment={
                                revisions.filter((revision) => revision.id != record.id).length > 0 && selectedRevision1 && (
                                    <InputAdornment sx={{ marginRight: "10px" }} position="end">
                                        <IconButton
                                            onClick={() => {
                                                setSelectedRevision1("");
                                                setRevision1Data({});
                                                revision1Config = ""
                                            }}
                                        >
                                            <ClearIcon></ClearIcon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        >

                            <MenuItem value="" disabled>Select Revision</MenuItem>
                            {revisions.filter((revision) => revision.id != record.id).map((revision) => (
                                <MenuItem key={revision.id} value={revision.id}>
                                    Revision Id: {revision.id} <br />
                                    {revision.comment}
                                </MenuItem>
                            ))}

                        </Select>
                    </>
                )}

                <Typography variant="h6">View Target</Typography>
                <Select
                    value={selectedTarget}
                    onChange={(e) => {
                        setSelectedTarget(e.target.value);
                    }}
                    fullWidth
                >
                    <MenuItem key="json_data" value="json_data">JSON Data</MenuItem>
                    {targets.map((target) => (
                        <MenuItem key={target.id} value={target.id}>
                            {target.name}
                        </MenuItem>
                    ))}
                </Select>

                <div style={{ marginTop: 16 }}>
                    <Typography variant="h6">Revision{(selectedRevision1 && record) ? " Comparison" : ""} </Typography>
                    <DiffViewer oldValue={revision1Config} newValue={revision2Config} hideMarkers={(selectedRevision1 && record) ? false : true} splitView={splitView} useDarkTheme={isDarkMode} />
                </div>

            </CardContent>
        </Card>
    );
};



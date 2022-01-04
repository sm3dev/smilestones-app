import {
  AddCircleOutline,
  Edit,
  List,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const MilestoneCard = ({ milestone, milestoneType }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          m: 2,
          flexShrink: 0,
          flexGrow: 0,
          width: 345,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        key={milestone.id}
      >
        <CardHeader
          titleTypographyProps={{
            variant: "h5",
          }}
          subheaderTypographyProps={{
            variant: "overline",
            component: Link,
            to: "/https://www.google.com",
          }}
          title={milestone.name}
          subheader={milestoneType.name}
          component={Link}
          to={`/milestones/${milestone.id}`}
        />
        <CardContent>
          <Typography variant="body2" component="div">
            {milestone.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "stretch" }}>
          <Button
            startIcon={<AddCircleOutline />}
            variant="contained"
            id={milestone.id}
            onClick={() =>
              navigate(`/milestones/${milestone.id}/achievements/create`)
            }
          >
            Submit Result
          </Button>
          <Button startIcon={<Edit />} variant="outlined" disabled>
            Edit
          </Button>
        </CardActions>
        <CardActions>
          {" "}
          <Button startIcon={<List />} variant="outlined" disabled fullWidth>
            Achievements <small> coming soon</small>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

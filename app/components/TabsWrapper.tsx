"use client";

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Markdown from "react-markdown";
import NewUser from "./NewUser";
import '../../styles/components/jd.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsWrapper({ entries, slug }: { entries: any[], slug: string }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Job Description" {...a11yProps(0)} />
          <Tab label="Apply" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {entries.map((entry) => (
        <div key={entry._id} className="p-4 m-2 rounded">
          <h2 className="font-semibold">{entry.title}</h2>
          <CustomTabPanel value={value} index={0}>
            <Markdown>{entry.description}</Markdown>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <NewUser jobTitle={slug} jobDescription={entry.description} />
          </CustomTabPanel>
        </div>
      ))}
    </Box>
  );
}

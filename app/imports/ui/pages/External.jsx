import React, { useState } from 'react';
import { Table, Nav, Button } from 'react-bootstrap';

const data = [
  { name: 'New York Times', link: 'https://www.nytimes.com/interactive/2023/11/01/us/hawaii-maui-fire-timeline.html?smid=url-share', description: 'Graphic Demonstrating Event Happening At Lahaina' },
  { name: 'Lahaina Maui Fire Helper Sheet', link: 'https://docs.google.com/spreadsheets/d/1DYJ2Zn3XB0n-nG8CfilR0M2i7v0xb2krTSXoZKiSpRc/edit?usp=sharing', description: 'List Of Gofundme Links to provide help toward familys' },
  { name: 'Lahaina Maui Volunteer Sheet', link: 'https://docs.google.com/spreadsheets/d/1B6dpfOUP0tc4ceCtuOXB6cDbHZWel98C-Gfs126ZdQ8/edit?usp=sharing', description: 'List Of Volunteering to provide help on Lahaina' },
  { name: 'Lahaina History', link: 'https://www.kumupono.com/lahaina/?fbclid=IwAR1_jU_nE2NSo_t-ITHp8Dzbsfjv27TUDBLVMeCDh5adNZ9RorJiI0DlQK0', description: 'Overview of Lahaina\'s Native History' },
  { name: 'NSF Award News', link: 'https://spectrumlocalnews.com/hi/hawaii/news/2023/10/05/national-science-foundation-university-hawaii-projects-grants-maui-fires', description: 'News Regarding NSF Reward to UH Project relating to Maui Fire' },
  { name: 'Maui Fire Cause', link: 'https://www.theguardian.com/commentisfree/2023/aug/17/hawaii-fires-maui-water-rights-disaster-capitalism', description: 'Detail Regarding Action Taken During Lahaina Fire' },
  { name: 'Air Quality Data', link: 'https://air.doh.hawaii.gov/home/map?fbclid=IwAR0D891veIKyDCULT7IMduA69GEAtWYfpKuX3kqeL6JY_Ck0BaTw2ew3lRo', description: 'Hawaii Air Quality Data For Every Island' },
  { name: 'Housing Proposal', link: 'https://www.civilbeat.org/2023/08/maui-county-council-gets-an-earful-from-angry-residents-over-housing-proposal', description: 'Ongoing Issues Regarding Housing and Resident\'s Frustration' },
  { name: 'Fire Update', link: 'https://www.mauiinformationguide.com/maui-fire.php', description: 'List of update regarding event happening at Lahaina Fire' },
  { name: 'Lahaina Town Guide', link: 'https://lahainatown.com/', description: 'Homepage of Lahaina Town' },
  { name: 'Maui Recovers', link: 'https://www.mauirecovers.org/', description: 'Maui Recover Information and Events' },
];

const External = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => currentItems.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td><Nav.Link href={item.link}>Link</Nav.Link></td>
      <td>{item.description}</td>
    </tr>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <Button
      key={number}
      onClick={() => setCurrentPage(number)}
      style={{ margin: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black' }}
    >
      {number}
    </Button>
  ));

  return (
    <div>
      <Table striped="columns">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {renderPageNumbers}
      </div>
    </div>
  );
};

export default External;

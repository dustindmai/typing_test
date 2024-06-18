import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../context/ThemeContext';

const TableUserData = ({data}) => {
  const {theme} = useTheme();
  const styleL = {color: theme.textColor, background: theme.background, textAlign: 'left'};
  const styleR = {color: theme.textColor, background: theme.background, textAlign: 'right'}
  const styleC = {color: theme.textColor, background: theme.background, textAlign: 'right'}
  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style = {styleL}>
                WPM
              </TableCell>
              <TableCell style = {styleC}>
                Accuracy
              </TableCell>
              <TableCell style = {styleC}>
                Characters
              </TableCell>
              <TableCell style = {styleR}>
                Time Stamp
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((i)=>(
                <TableRow>
                  <TableCell style={styleL}>
                    {i.wpm}
                  </TableCell>
                  <TableCell style={styleC}>
                    {i.accuracy}
                  </TableCell>
                  <TableCell style={styleC}>
                    {i.characters}
                  </TableCell>
                  <TableCell style={styleR}>
                    {i.timeStamp.toDate().toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableUserData
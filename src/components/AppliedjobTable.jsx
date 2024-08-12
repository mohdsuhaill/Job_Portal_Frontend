import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedjobTable = () => {

    const {allAppliedJobs}=useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A List of Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Comapany</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied Any job .</span> : allAppliedJobs.map((appliedJOb)=>(
                            <TableRow key={appliedJOb._id}>
                                <TableCell>{appliedJOb?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJOb?.job?.title}</TableCell>
                                <TableCell>{appliedJOb?.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJOb?.status === "rejected" ? "bg-red-400" : appliedJOb?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJOb?.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedjobTable;3
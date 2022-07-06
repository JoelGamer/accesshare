import { Chip, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Container } from '@mui/system';
import { ComponentProps, FC, useCallback, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import groupInvoiceService from '../../api/group-invoice-service';
import useAsyncState from '../../hooks/use-async-state';
import { currencyFormat } from '../../utilities/i18n-format';

const invoiceStatus = (paid: Dayjs | null, expires: Dayjs) => {
  if (paid) return 'paid'
  if (expires.isBefore(dayjs())) return 'late'
  return 'pending';
};

const chipColorByStatus: Record<string, ComponentProps<typeof Chip>['color']> = {
  paid: 'success',
  late: 'error',
  pending: 'default',
};

const InvoiceStatus: FC<InvoiceStatusProps> = ({ expires_in, paid_in }) => {
  const status = useMemo(() => invoiceStatus(paid_in ? dayjs(paid_in) : null, dayjs(expires_in)), [expires_in, paid_in]);
  const colorStatus = useMemo(() => chipColorByStatus[status], [status]);

  return <Chip label={status} variant="outlined" color={colorStatus} />;
};

interface InvoiceStatusProps {
  paid_in: Date | null;
  expires_in: Date;
}

const Invoices: FC = () => {
  const [invoices, _, reload] = useAsyncState(async () => await groupInvoiceService.index(), []);

  const dateToDayjs = useCallback((date: Date | null) => {
    return date ? dayjs(date) : null;
  }, []);

  const onClickUserPaid = async (id: number) => {
    await groupInvoiceService.paid(id);
    reload();
  }

  return (
    <Container>
      <Stack spacing={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Paid In</TableCell>
                <TableCell>Expires In</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.map(({ id, group_user, invoice }) => (
                <TableRow key={id}>
                  <TableCell>{group_user.user.name}</TableCell>
                  <TableCell>{currencyFormat(invoice.price)}</TableCell>
                  <TableCell>{invoice.paid_in ? dateToDayjs(invoice.paid_in)!.format('DD/MM/YYYY') : 'N/A'}</TableCell>
                  <TableCell>{dayjs(invoice.expires_in).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center"><InvoiceStatus expires_in={invoice.expires_in} paid_in={invoice.paid_in} /></TableCell>
                  <TableCell align="right">
                    {!invoice.paid_in && (
                      <Tooltip title="Paid">
                        <IconButton onClick={() => onClickUserPaid(id)}>
                          <PaidIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {invoice.paid_in && (
                      <Tooltip title="Receipt">
                        <IconButton onClick={() => onClickUserPaid(id)}>
                          <ReceiptIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default Invoices;

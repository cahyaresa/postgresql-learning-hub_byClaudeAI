import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import EnhancedDashboard from './pages/EnhancedDashboard'
import Dashboard from './pages/Dashboard'
import SearchPage from './pages/SearchPage'
import LearningPathPage from './pages/LearningPathPage'
import SettingsPage from './pages/SettingsPage'
import PgCtl from './modules/PgCtl'
import PgCtlVsSystemd from './modules/PgCtlVsSystemd'
import HostBasedAuth from './modules/HostBasedAuth'
import TransactionLog from './modules/TransactionLog'
import MemoryManagement from './modules/MemoryManagement'
import Tablespaces from './modules/Tablespaces'
import DataPartitioning from './modules/DataPartitioning'
import DatabaseDesign from './modules/DatabaseDesign'
import StateMachine from './modules/StateMachine'
import RdbmsTypes from './modules/RdbmsTypes'
import InstallPostgres from './modules/InstallPostgres'
import SqlSyntax from './modules/SqlSyntax'
import ScalingModule from './modules/ScalingModule'
import ACID from './modules/ACID'
import Benchmarking from './modules/Benchmarking'
import BackupRestore from './modules/BackupRestore'
import Replication from './modules/Replication'
import HaDr from './modules/HaDr'
import Monitoring from './modules/Monitoring'

function App() {
  return (
    <Router>
      <div style={{padding:'20px 40px', minHeight: '100vh', background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
        <Navigation />

        <main style={{ minHeight: 'calc(100vh - 70px)' }}>
          <Routes>
            <Route path="/" element={<EnhancedDashboard />} />
            <Route path="/pg-ctl" element={<PgCtl />} />
            <Route path="/pg-ctl-vs-systemd" element={<PgCtlVsSystemd />} />
            <Route path="/host-based-auth" element={<HostBasedAuth />} />
            <Route path="/transaction-log" element={<TransactionLog />} />
            <Route path="/memory-management" element={<MemoryManagement />} />
            <Route path="/tablespaces" element={<Tablespaces />} />
            <Route path="/data-partitioning" element={<DataPartitioning />} />
            <Route path="/database-design" element={<DatabaseDesign />} />
            <Route path="/state-machine" element={<StateMachine />} />
            <Route path="/rdbms-types" element={<RdbmsTypes />} />
            <Route path="/install-postgres" element={<InstallPostgres />} />
            <Route path="/sql-syntax" element={<SqlSyntax />} />
            <Route path="/scaling" element={<ScalingModule />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/learning-paths" element={<LearningPathPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/acid-concepts" element={<ACID />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/backup-restore" element={<BackupRestore />} />
            <Route path="/replication" element={<Replication />} />
            <Route path="/ha-dr" element={<HaDr />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App

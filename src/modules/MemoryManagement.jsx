import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MemoryManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabConfigs = [
    { id: 'overview', label: '📖 Overview', desc: 'Memory konsep' },
    { id: 'vas', label: '🗺️ Virtual Address Space', desc: 'VAS layout' },
    { id: 'segments', label: '📦 Memory Segments', desc: 'Text, Data, BSS, Heap, Stack' },
    { id: 'kernel-user', label: '🔐 Kernel vs User Space', desc: 'Separation' },
    { id: 'heap-stack', label: '🔄 Heap & Stack', desc: 'Dynamic memory' },
    { id: 'process-isolation', label: '🔒 Process Isolation', desc: 'Per-process memory' },
    { id: 'paging', label: '💾 Paging & TLB', desc: 'Virtual → Physical' },
    { id: 'practical', label: '💻 Practical Examples', desc: 'Code & memory' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Memory Management Basics
              </h3>
              
              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '18px', marginBottom: '16px' }}>
                Modern operating systems (Linux, Windows, macOS) menggunakan <strong>Virtual Memory</strong> management. 
                Setiap process mendapat virtual address space sendiri, isolated dari processes lain.
              </p>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🎯 Key Concepts:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                  <li>✓ <strong>Virtual Address (VA):</strong> Address yang digunakan oleh program</li>
                  <li>✓ <strong>Physical Address (PA):</strong> Actual memory address di RAM</li>
                  <li>✓ <strong>MMU (Memory Management Unit):</strong> Hardware translate VA → PA</li>
                  <li>✓ <strong>Virtual Address Space:</strong> Isolated memory space per process (0x0 → max)</li>
                  <li>✓ <strong>Page:</strong> Unit terkecil (biasanya 4KB)</li>
                  <li>✓ <strong>TLB (Translation Lookaside Buffer):</strong> Cache untuk VA→PA mapping</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>💡 Why Virtual Memory?</p>
                <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                  <li>✓ <strong>Isolation:</strong> Processes tidak dapat access memory process lain</li>
                  <li>✓ <strong>Protection:</strong> Segmentation Fault jika akses invalid address</li>
                  <li>✓ <strong>Flexibility:</strong> Program bisa lebih besar dari physical RAM (use disk paging)</li>
                  <li>✓ <strong>Simple:</strong> Program always start at address 0x0 (semantically)</li>
                  <li>✓ <strong>Relocatable:</strong> Program tidak perlu tahu physical memory layout</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'vas':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Virtual Address Space (VAS) Layout
              </h3>
              
              <p style={{ color: '#a0c8ff', fontSize: '17px', marginBottom: '16px' }}>
                Setiap process memiliki virtual address space dari 0x0 (minimum) sampai maksimum (tergantung architecture):
              </p>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>64-bit Linux VAS Layout (top to bottom):</p>
                <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '12px', borderRadius: '6px', marginBottom: '8px' }}>
                  <p style={{ color: '#f87171' }}>0xffffffffffffffff ← Maximum (48-bit: 0xffffffffffff)</p>
                  <p style={{ color: '#fbbf24' }}>┌─ KERNEL SPACE (protected, kernel-only)</p>
                  <p style={{ color: '#fbbf24', marginLeft: '20px' }}>│  Kernel code, data, heap</p>
                  <p style={{ color: '#fbbf24' }}>└─ ~0xffffffff80000000</p>
                </div>

                <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '12px', borderRadius: '6px', marginBottom: '8px' }}>
                  <p style={{ color: '#f87171' }}>GUARD REGION (unusable, segfault if access)</p>
                </div>

                <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '12px', borderRadius: '6px' }}>
                  <p style={{ color: '#4ade80' }}>USER SPACE (application code & data)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ Stack (grows downward ↓)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ Memory-mapped regions (libraries, files, anonymous)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ Heap (grows upward ↑)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ BSS segment (uninitialized static variables)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ Data segment (initialized static variables)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>├─ Text segment (executable code)</p>
                  <p style={{ color: '#4ade80', marginLeft: '20px' }}>└─ 0x0 (minimum)</p>
                </div>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>Architecture-specific:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>64-bit: typically 48-bit VAS (256 TB) - 128 TB kernel, 128 TB user</li>
                  <li>32-bit: 32-bit VAS (4 GB) - 1 GB kernel, 3 GB user (typical)</li>
                  <li>Some systems: 3 GB user / 1 GB kernel split</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'segments':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Memory Segments (dari image)
              </h3>

              {[
                {
                  name: '📄 TEXT SEGMENT',
                  desc: 'Executable code (read-only, shareable)',
                  example: 'Binary image of process (ELF format)',
                  properties: ['Read-only', 'Shareable across processes', 'Loaded from executable file']
                },
                {
                  name: '📊 DATA SEGMENT',
                  desc: 'Initialized static/global variables (read-write)',
                  example: 'static char *username = "admin"; (initialized)',
                  properties: ['Read-write', 'Fixed size at compile time', 'Loaded from executable file']
                },
                {
                  name: '📭 BSS SEGMENT',
                  desc: 'Uninitialized static/global variables (zero-filled at startup)',
                  example: 'static char buffer[10000]; (no initializer)',
                  properties: ['Read-write', 'Filled with zeros at startup', 'NOT stored in executable file (size only)']
                },
                {
                  name: '⬆️ HEAP',
                  desc: 'Dynamic memory allocation (malloc, calloc, new)',
                  example: 'int *ptr = malloc(sizeof(int) * 100);',
                  properties: ['Read-write', 'Grows upward (↑)', 'Managed by allocator', 'Per-block metadata overhead']
                },
                {
                  name: '⬇️ STACK',
                  desc: 'Function parameters, local variables, return addresses',
                  example: 'void func() { int x = 5; } ← x allocated on stack',
                  properties: ['Read-write', 'Grows downward (↓)', 'Automatic (LIFO)', 'Faster than heap', 'Limited size (RLIMIT_STACK)']
                }
              ].map((seg, idx) => (
                <div key={idx} style={{ background: idx % 2 === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '12px', borderLeft: `3px solid ${idx % 2 === 0 ? '#4ade80' : '#fbbf24'}` }}>
                  <p style={{ color: idx % 2 === 0 ? '#4ade80' : '#fbbf24', fontWeight: 'bold', marginBottom: '4px', fontSize: '17px' }}>
                    {seg.name}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '6px' }}>
                    {seg.desc}
                  </p>
                  <p style={{ color: '#708090', fontSize: '15px', fontStyle: 'italic', marginBottom: '6px' }}>
                    Example: {seg.example}
                  </p>
                  <ul style={{ color: '#a0c8ff', fontSize: '15px', marginLeft: '12px' }}>
                    {seg.properties.map((prop, pidx) => (
                      <li key={pidx}>• {prop}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'kernel-user':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Kernel Space vs User Space
              </h3>

              <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: '3px solid #f87171' }}>
                <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '12px' }}>🔴 KERNEL SPACE</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ Address range: ~0xffffffff80000000 → 0xffffffffffffffff</li>
                  <li>✓ Only kernel code runs here (ring 0 - full privileges)</li>
                  <li>✓ Contains: kernel code, kernel data, page tables, interrupt handlers</li>
                  <li>✓ User code CANNOT access (Segmentation Fault if try)</li>
                  <li>✓ Always resident in physical memory</li>
                  <li>✓ Protected: memory protection via CPU modes</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🟢 USER SPACE</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ Address range: 0x0 → ~0x7fffffffffff (128 TB on 64-bit)</li>
                  <li>✓ Application code runs here (ring 3 - limited privileges)</li>
                  <li>✓ Contains: code, data, heap, stack, libraries</li>
                  <li>✓ Isolated per process (each sees 0x0 → max)</li>
                  <li>✓ Can be paged to disk (swapped out)</li>
                  <li>✓ Cannot access kernel memory directly</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>🔄 Context Switch (Kernel ↔ User)</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>System call: user → kernel (CPU mode change, switch page table)</li>
                  <li>Interrupt/Exception: automatic kernel entry</li>
                  <li>Return: kernel → user (restore context, switch page table)</li>
                  <li>Expensive: TLB flush, cache invalidation, context overhead</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'heap-stack':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Heap & Stack (Dynamic Memory)
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px', lineHeight: '1.8' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Memory Layout (overlook):</p>
                <p>HIGH ADDR: 0xffffffff...</p>
                <p style={{ color: '#f87171' }}>  ┌─ KERNEL SPACE</p>
                <p style={{ color: '#4ade80' }}>  │</p>
                <p style={{ color: '#4ade80' }}>  │ STACK (grows ↓ downward)</p>
                <p style={{ color: '#4ade80' }}>  │ esp/rsp pointer</p>
                <p style={{ color: '#4ade80' }}>  │ ═══════════════ ← stack top (grows down)</p>
                <p style={{ color: '#4ade80' }}>  │ [func params]</p>
                <p style={{ color: '#4ade80' }}>  │ [return addr]</p>
                <p style={{ color: '#4ade80' }}>  │ [local vars]</p>
                <p style={{ color: '#4ade80' }}>  │ empty space</p>
                <p style={{ color: '#4ade80' }}>  │</p>
                <p style={{ color: '#4ade80' }}>  │ MEMORY-MAPPED REGIONS</p>
                <p style={{ color: '#4ade80' }}>  │ (libraries, files, anonymous)</p>
                <p style={{ color: '#4ade80' }}>  │</p>
                <p style={{ color: '#4ade80' }}>  │ ═══════════════ ← heap top (grows up)</p>
                <p style={{ color: '#4ade80' }}>  │ [allocated blocks]</p>
                <p style={{ color: '#4ade80' }}>  │ [free space]</p>
                <p style={{ color: '#4ade80' }}>  │ HEAP (grows ↑ upward)</p>
                <p style={{ color: '#4ade80' }}>  │ brk pointer</p>
                <p style={{ color: '#4ade80' }}>  │</p>
                <p style={{ color: '#4ade80' }}>  │ BSS segment</p>
                <p style={{ color: '#4ade80' }}>  │ Data segment</p>
                <p style={{ color: '#4ade80' }}>  │ Text segment</p>
                <p>LOW ADDR: 0x0</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>📌 STACK</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '16px', marginTop: '8px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Grows</td>
                      <td>Downward (high → low address)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Pointer</td>
                      <td>esp (32-bit), rsp (64-bit)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Speed</td>
                      <td>Very fast (just decrement pointer)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Limit</td>
                      <td>RLIMIT_STACK (default 8 MB)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px' }}>Usage</td>
                      <td>Local variables, params, return addr</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>📌 HEAP</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '16px', marginTop: '8px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Grows</td>
                      <td>Upward (low → high address)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Pointer</td>
                      <td>brk/sbrk (managed by allocator)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Speed</td>
                      <td>Slower (allocator overhead)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Limit</td>
                      <td>RLIMIT_AS (virtual memory limit)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px' }}>Usage</td>
                      <td>malloc/calloc/new allocations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'process-isolation':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Process Isolation (dari image - 2 processes)
              </h3>

              <p style={{ color: '#a0c8ff', fontSize: '17px', marginBottom: '16px' }}>
                Image menunjukkan Process 1 dan Process 2 masing-masing punya virtual address space sendiri. 
                Keduanya dapat punya data di address yang sama, tetapi refer ke physical memory yang berbeda!
              </p>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Isolation via Page Tables:</p>
                <p>Process 1:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Virtual 0x1000 → Physical 0x4000 (via page table 1)</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Variable x at 0x1000</p>

                <p style={{ marginTop: '8px' }}>Process 2:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Virtual 0x1000 → Physical 0x8000 (via page table 2)</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Variable y at 0x1000</p>

                <p style={{ marginTop: '8px', color: '#f87171' }}>Same virtual address (0x1000), different physical (0x4000 vs 0x8000)!</p>
                <p style={{ color: '#f87171' }}>Process 1 cannot see Process 2's data (different physical memory)</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🔐 How Isolation Works:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ Each process has own page table (in memory, pointed by CR3 register on x86)</li>
                  <li>✓ CPU uses page table to translate VA → PA</li>
                  <li>✓ Process A cannot modify Process B's page table (kernel-protected)</li>
                  <li>✓ If Process A try access address in Process B's memory: MMU reject (page fault → SIGSEGV)</li>
                  <li>✓ Context switch: load different page table (CPU cache invalidate - TLB flush)</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>🚨 Segmentation Fault</p>
                <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '8px' }}>
                  Image shows: "User code CANNOT read from non-existent addresses, doing so results in a Segmentation Fault"
                </p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>Try access unmapped virtual address → page fault</li>
                  <li>Page fault handler check: is it valid address for this process?</li>
                  <li>If NO → send SIGSEGV signal → process killed ☠️</li>
                  <li>If YES → allocate physical page, update page table, continue</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'paging':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Paging & Address Translation
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Virtual → Physical Translation:</p>
                <p>1. Program generates Virtual Address (VA): 0x12345</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>└─ e.g., int x; x = 10; → address of x = VA</p>
                
                <p style={{ marginTop: '8px' }}>2. MMU (Memory Management Unit) split VA:</p>
                <p style={{ marginLeft: '20px' }}>VA = [Page Number (VPN)] [Offset within page]</p>
                <p style={{ marginLeft: '40px' }}>Example: 0x12345 (4KB pages = 12 bits offset)</p>
                <p style={{ marginLeft: '40px' }}>VPN = 0x12 (page number)</p>
                <p style={{ marginLeft: '40px' }}>Offset = 0x345 (position in page)</p>
                
                <p style={{ marginTop: '8px' }}>3. Look up VPN in Page Table:</p>
                <p style={{ marginLeft: '20px' }}>Page Table[VPN] → Page Table Entry (PTE)</p>
                <p style={{ marginLeft: '40px' }}>PTE contains: Physical Page Number (PPN) + flags</p>
                <p style={{ marginLeft: '40px' }}>Example: PTE = [PPN=0x8000, present=1, writable=1, ...]</p>
                
                <p style={{ marginTop: '8px' }}>4. Check TLB (Translation Lookaside Buffer) first:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>TLB hit → return cached PA immediately (fast!)</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>TLB miss → walk page table, update TLB</p>
                
                <p style={{ marginTop: '8px' }}>5. Construct Physical Address:</p>
                <p style={{ marginLeft: '20px' }}>PA = [PPN] [Offset] = [0x8000] [0x345] = 0x8000345</p>
                
                <p style={{ marginTop: '8px' }}>6. Access physical memory:</p>
                <p style={{ marginLeft: '20px' }}>Read/write from RAM[0x8000345]</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🚀 TLB (Translation Lookaside Buffer)</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ Hardware cache untuk VA→PA mappings</li>
                  <li>✓ Typical: 512-4096 entries</li>
                  <li>✓ TLB hit: 1-2 cycles (very fast)</li>
                  <li>✓ TLB miss: page table walk (10-100+ cycles)</li>
                  <li>✓ Context switch: TLB flush (invalidate all entries)</li>
                  <li>✓ Page size: larger page (2MB, 1GB) = fewer TLB entries needed</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>Page Faults</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li><strong>Minor page fault:</strong> Page in memory, but not in TLB → reload TLB</li>
                  <li><strong>Major page fault:</strong> Page not in physical memory → fetch from disk (swap)</li>
                  <li><strong>Page not present:</strong> Invalid access → SIGSEGV</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'practical':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Practical Examples & Commands
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Check process memory layout:</p>
                <p>cat /proc/PID/maps</p>
                <p style={{ color: '#708090', marginTop: '4px' }}>Show: virtual address ranges, permissions, file mappings</p>
                
                <p style={{ marginTop: '12px', color: '#fbbf24' }}>Check stack/heap usage:</p>
                <p>ps aux | grep program</p>
                <p>top → VIRT (virtual), RES (physical resident)</p>
                
                <p style={{ marginTop: '12px', color: '#fbbf24' }}>View page table (Linux):</p>
                <p>cat /proc/PID/pagetypeinfo</p>
                
                <p style={{ marginTop: '12px', color: '#fbbf24' }}>Monitor TLB misses:</p>
                <p>perf stat -e dTLB-load-misses ./program</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>💻 Code Example:</p>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px', color: '#86efac', lineHeight: '1.6' }}>
                  <pre style={{ margin: 0 }}>{`int global_init = 100;      // Data segment
int global_uninit;         // BSS segment

int main() {
  static int static_var = 5; // Data segment
  int local_var = 10;        // Stack
  int *heap_ptr;             // Stack (pointer)
  
  heap_ptr = malloc(sizeof(int) * 100); // Heap
  
  // local_var address (stack): 0x7fffffffdd00
  // heap_ptr address (stack): 0x7fffffffdd08
  // heap_ptr→ address (heap): 0x5555555592a0
  // global_init address (data): 0x555555558010
  // global_uninit address (bss): 0x555555559034
  
  printf("Stack var at: %p\\n", &local_var);
  printf("Heap var at: %p\\n", heap_ptr);
  printf("Global init at: %p\\n", &global_init);
  
  free(heap_ptr);
  return 0;
}`}</pre>
                </div>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>Common Issues:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li><strong>Stack overflow:</strong> Too many recursions or large local arrays</li>
                  <li><strong>Heap fragmentation:</strong> Many small allocations</li>
                  <li><strong>Memory leak:</strong> malloc but never free</li>
                  <li><strong>Use-after-free:</strong> Access freed memory</li>
                  <li><strong>Segmentation fault:</strong> Invalid memory access</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)', minHeight: '100vh' }}>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            Memory Management & Virtual Address Space 🗺️
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Process memory layout, kernel space, user space, segments, paging, dan process isolation
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', paddingBottom: '16px', overflowX: 'auto' }}>
          {tabConfigs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                fontSize: '17px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : 'none',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          🗺️ Virtual Memory = Foundation of modern operating systems
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Key insight: MMU + Page Tables = Process isolation + Protection + Flexibility! 🚀
        </p>
      </footer>
    </div>
  );
};

export default MemoryManagement;